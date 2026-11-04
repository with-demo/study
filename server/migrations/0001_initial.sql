PRAGMA foreign_keys = ON;
CREATE TABLE oauth_requests (
  state_hash TEXT PRIMARY KEY, project TEXT NOT NULL, screen TEXT NOT NULL,
  challenge TEXT NOT NULL, verifier TEXT NOT NULL, expires INTEGER NOT NULL
);
CREATE TABLE login_codes (
  code_hash TEXT PRIMARY KEY, project TEXT NOT NULL, challenge TEXT NOT NULL,
  user_json TEXT NOT NULL, expires INTEGER NOT NULL
);
CREATE TABLE sessions (
  token_hash TEXT PRIMARY KEY, project TEXT NOT NULL,
  user_json TEXT NOT NULL, expires INTEGER NOT NULL
);
CREATE TABLE counters (
  project TEXT NOT NULL, screen TEXT NOT NULL, number INTEGER NOT NULL,
  PRIMARY KEY (project, screen)
);
CREATE TABLE records (
  id TEXT PRIMARY KEY, project TEXT NOT NULL, screen TEXT NOT NULL,
  number INTEGER NOT NULL, text TEXT NOT NULL, anchor TEXT NOT NULL,
  author TEXT NOT NULL, created TEXT NOT NULL, updated TEXT,
  updated_by TEXT, revision INTEGER NOT NULL DEFAULT 1,
  UNIQUE(project, screen, number)
);
CREATE INDEX records_route ON records(project, screen);
CREATE TABLE comments (
  id TEXT PRIMARY KEY, record_id TEXT NOT NULL REFERENCES records(id) ON DELETE CASCADE,
  text TEXT NOT NULL, author TEXT NOT NULL, created TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT '미처리', updated TEXT, updated_by TEXT,
  revision INTEGER NOT NULL DEFAULT 1
);
