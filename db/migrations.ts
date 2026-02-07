import { db } from "./database";

export function runMigrations() {
  const version =
    db.getFirstSync<{ user_version: number }>(
      "PRAGMA user_version"
    )?.user_version ?? 0;

  //AGREGAR INGRESO A QUINCENAS
  if (version < 1) {
    db.execSync(`
      ALTER TABLE quincenas
      ADD COLUMN ingreso REAL NOT NULL DEFAULT 0;
    `);

    //AGREGAR DELETED AT A CATEGORIAS Y CONCEPTOS
    db.execSync(`
      ALTER TABLE categorias
      ADD COLUMN deleted_at TEXT;
    `);

    db.execSync(`
      ALTER TABLE conceptos
      ADD COLUMN deleted_at TEXT;
    `);
    
    db.execSync("PRAGMA user_version = 1");
  }

}
