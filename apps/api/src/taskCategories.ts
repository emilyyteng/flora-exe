import type { Pool, PoolClient } from "pg";

type Queryable = Pool | PoolClient;

export type TaskCategoryKind = "application" | "misc";

export type TaskCategoryRow = {
  id: string;
  name: string;
  kind: TaskCategoryKind;
  system: boolean;
  sortOrder: number;
  openCount: number;
};

const categorySelect = `
  SELECT
    c.id,
    c.name,
    c.kind,
    c.system,
    c.sort_order AS "sortOrder",
    COUNT(t.id) FILTER (WHERE t.status = 'open')::int AS "openCount"
  FROM task_categories c
  LEFT JOIN tasks t ON t.category_id = c.id
`;

export async function listTaskCategories(db: Queryable): Promise<TaskCategoryRow[]> {
  const { rows } = await db.query<TaskCategoryRow>(
    `${categorySelect}
     GROUP BY c.id
     ORDER BY c.sort_order ASC, c.created_at ASC`,
  );
  return rows;
}

export async function getTaskCategoryById(
  db: Queryable,
  id: string,
): Promise<TaskCategoryRow | null> {
  const { rows } = await db.query<TaskCategoryRow>(
    `${categorySelect}
     WHERE c.id = $1
     GROUP BY c.id`,
    [id],
  );
  return rows[0] ?? null;
}

export async function getApplicationTaskCategory(db: Queryable): Promise<TaskCategoryRow> {
  const { rows } = await db.query<TaskCategoryRow>(
    `${categorySelect}
     WHERE c.kind = 'application'
     GROUP BY c.id
     LIMIT 1`,
  );
  if (!rows[0]) {
    throw new Error("Applications task category is missing — run migrations");
  }
  return rows[0];
}

/** Reserved misc dump ground (MT-12). Open + completed tasks land here when a category is deleted. */
export async function getMiscDumpCategory(db: Queryable): Promise<TaskCategoryRow> {
  const { rows } = await db.query<TaskCategoryRow>(
    `${categorySelect}
     WHERE c.kind = 'misc' AND c.system = true AND lower(c.name) = 'misc'
     GROUP BY c.id
     LIMIT 1`,
  );
  if (!rows[0]) {
    throw new Error("Misc task category is missing — run migrations");
  }
  return rows[0];
}

const RESERVED_MISC_NAMES = new Set(["misc", "admin", "applications"]);

export async function createTaskCategory(
  db: Queryable,
  name: string,
): Promise<TaskCategoryRow> {
  const trimmed = name.trim();
  if (!trimmed) {
    throw Object.assign(new Error("name is required"), { status: 400 });
  }
  if (RESERVED_MISC_NAMES.has(trimmed.toLowerCase())) {
    throw Object.assign(new Error("That category name is reserved"), { status: 400 });
  }
  try {
    // Keep user categories before reserved Misc (sort_order 10000).
    const { rows } = await db.query<{ id: string }>(
      `INSERT INTO task_categories (name, kind, system, sort_order)
       VALUES ($1, 'misc', false, 1000)
       RETURNING id`,
      [trimmed],
    );
    return (await getTaskCategoryById(db, rows[0]!.id))!;
  } catch (error) {
    const code = (error as { code?: string }).code;
    if (code === "23505") {
      throw Object.assign(new Error("A category with that name already exists"), { status: 409 });
    }
    throw error;
  }
}

export async function renameTaskCategory(
  db: Queryable,
  id: string,
  name: string,
): Promise<TaskCategoryRow | null> {
  const trimmed = name.trim();
  if (!trimmed) {
    throw Object.assign(new Error("name is required"), { status: 400 });
  }
  if (RESERVED_MISC_NAMES.has(trimmed.toLowerCase())) {
    throw Object.assign(new Error("That category name is reserved"), { status: 400 });
  }
  const existing = await getTaskCategoryById(db, id);
  if (!existing) return null;
  if (existing.kind === "application" || existing.system) {
    throw Object.assign(new Error("Reserved category cannot be renamed"), { status: 400 });
  }
  try {
    await db.query(
      `UPDATE task_categories SET name = $2, updated_at = now() WHERE id = $1`,
      [id, trimmed],
    );
  } catch (error) {
    const code = (error as { code?: string }).code;
    if (code === "23505") {
      throw Object.assign(new Error("A category with that name already exists"), { status: 409 });
    }
    throw error;
  }
  return getTaskCategoryById(db, id);
}

export async function deleteTaskCategory(db: Queryable, id: string): Promise<"ok" | "missing"> {
  const existing = await getTaskCategoryById(db, id);
  if (!existing) return "missing";
  if (existing.kind === "application" || existing.system) {
    throw Object.assign(new Error("Reserved category cannot be deleted"), { status: 400 });
  }
  const misc = await getMiscDumpCategory(db);
  if (misc.id === id) {
    throw Object.assign(new Error("Reserved category cannot be deleted"), { status: 400 });
  }
  // Move open + completed tasks to Misc so nothing is orphaned or blocked.
  await db.query(
    `UPDATE tasks SET category_id = $2, updated_at = now()
     WHERE category_id = $1`,
    [id, misc.id],
  );
  // The points breakdown labels these earns by their recorded name once the category is gone.
  await db.query(
    `UPDATE points_events
     SET meta = meta || jsonb_build_object('task_category_name', $2::text)
     WHERE kind = 'earn' AND meta->>'task_category_id' = $1`,
    [id, existing.name],
  );
  await db.query(`DELETE FROM task_categories WHERE id = $1`, [id]);
  return "ok";
}
