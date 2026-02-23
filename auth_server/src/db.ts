import Database from "better-sqlite3";


export const db = new Database("app.db")

db.pragma("foreign_keys = ON")
db.pragma("journal_mode = WAL")

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        username TEXT NOT NULL UNIQUE COLLATE NOCASE,
        email TEXT NOT NULL UNIQUE COLLATE NOCASE,
        password_hash TEXT NOT NULL,
        role TEXT CHECK (role IN ('ADMIN', 'MANAGER', 'USER')) NOT NULL, 
        token_version INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sessions (
        id text PRIMARY KEY,
        user_id INTEGER NOT NULL,
        type TEXT CHECK(type IN ('SESSION', 'JWT')) NOT NULL,
        refresh_token_hash TEXT,
        device_name TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        expires_at DATETIME NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )

    CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
    `)

