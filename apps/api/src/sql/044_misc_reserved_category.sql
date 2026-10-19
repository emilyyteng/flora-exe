-- MT-12: Misc is the reserved dump ground for deleted categories (like Applications).
-- Rename legacy Admin → Misc when needed; mark Misc system=true; sort last.

DO $$
DECLARE
  admin_id uuid;
  misc_id uuid;
BEGIN
  SELECT id INTO misc_id
  FROM task_categories
  WHERE kind = 'misc' AND lower(name) = 'misc'
  LIMIT 1;

  SELECT id INTO admin_id
  FROM task_categories
  WHERE kind = 'misc' AND lower(name) = 'admin'
  LIMIT 1;

  IF misc_id IS NULL AND admin_id IS NOT NULL THEN
    UPDATE task_categories
    SET name = 'Misc', system = true, sort_order = 10000, updated_at = now()
    WHERE id = admin_id;
    misc_id := admin_id;
  ELSIF misc_id IS NULL THEN
    INSERT INTO task_categories (name, kind, system, sort_order)
    VALUES ('Misc', 'misc', true, 10000)
    RETURNING id INTO misc_id;
  ELSE
    UPDATE task_categories
    SET system = true, sort_order = 10000, updated_at = now()
    WHERE id = misc_id;

    IF admin_id IS NOT NULL AND admin_id <> misc_id THEN
      UPDATE tasks
      SET category_id = misc_id, updated_at = now()
      WHERE category_id = admin_id;

      UPDATE points_events
      SET meta = meta || jsonb_build_object('task_category_name', 'Admin')
      WHERE kind = 'earn' AND meta->>'task_category_id' = admin_id::text;

      DELETE FROM task_categories WHERE id = admin_id;
    END IF;
  END IF;
END $$;
