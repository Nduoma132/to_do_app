CREATE TABLE IF NOT EXISTS todos (
  id          SERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  is_done     BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);
