import { db } from "@/db/database";
import { initDatabase } from "@/db/initDatabase";

export function deleteDatabase() {
  if (!__DEV__) return;

  db.execSync(`
    PRAGMA foreign_keys = OFF;

    DROP TABLE IF EXISTS gastos;
    DROP TABLE IF EXISTS quincena_configuracion;
    DROP TABLE IF EXISTS quincenas;
    DROP TABLE IF EXISTS conceptos;
    DROP TABLE IF EXISTS categorias;
    DROP TABLE IF EXISTS configuracion;

    PRAGMA user_version = 0;
    PRAGMA foreign_keys = ON;
  `);

  initDatabase();
  console.log("♻️ BD reseteada");
}
