import { db } from "./database";

export function runMigrations() {
  const version =
    db.getFirstSync<{ user_version: number }>(
      "PRAGMA user_version"
    )?.user_version ?? 0;

  if (version < 1) {
    console.log("⬆️ Migrando a versión 2");

    db.execSync(`
      ALTER TABLE quincenas
      ADD COLUMN ingreso REAL NOT NULL DEFAULT 0;
    `);

    db.execSync("PRAGMA user_version = 1");
  }
}
