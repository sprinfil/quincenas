import { db } from "./database";
import { runMigrations } from "./migrations";
import { seedDatabase } from "./seedDataBase";

export function initDatabase() {
  db.execSync(`
    PRAGMA foreign_keys = ON;

    -- CONFIGURACION GLOBAL
    CREATE TABLE IF NOT EXISTS configuracion (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      ingreso_quincenal REAL NOT NULL
    );

    -- CATEGORIAS
    CREATE TABLE IF NOT EXISTS categorias (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      porcentaje REAL NOT NULL
    );

    -- CONCEPTOS
    CREATE TABLE IF NOT EXISTS conceptos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      categoria_id INTEGER NOT NULL,
      FOREIGN KEY (categoria_id)
        REFERENCES categorias(id)
        ON DELETE CASCADE
    );

    -- QUINCENAS
    CREATE TABLE IF NOT EXISTS quincenas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fecha_inicio TEXT NOT NULL,
      fecha_fin TEXT
    );

    -- QUINCENA_CONFIGURACION
    CREATE TABLE IF NOT EXISTS quincena_configuracion (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      quincena_id INTEGER NOT NULL,
      categoria_id INTEGER NOT NULL,
      nombre TEXT NOT NULL,
      porcentaje REAL NOT NULL,
      FOREIGN KEY (quincena_id)
        REFERENCES quincenas(id)
        ON DELETE CASCADE,
      FOREIGN KEY (categoria_id)
        REFERENCES categorias(id)
        ON DELETE CASCADE
    );

    -- GASTOS
    CREATE TABLE IF NOT EXISTS gastos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      concepto_id INTEGER NOT NULL,
      quincena_configuracion_id INTEGER NOT NULL,
      monto REAL NOT NULL,
      FOREIGN KEY (concepto_id)
        REFERENCES conceptos(id)
        ON DELETE CASCADE,
      FOREIGN KEY (quincena_configuracion_id)
        REFERENCES quincena_configuracion(id)
        ON DELETE CASCADE
    );
  `);

  runMigrations();
  seedDatabase();
}