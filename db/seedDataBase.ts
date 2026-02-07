import { db } from "./database";

export function seedDatabase() {
  const version =
    db.getFirstSync<{ application_id: number }>("PRAGMA application_id")
      ?.application_id ?? 0;

  if (version < 1) {
    console.log("🌱 Ejecutando seeders...");

    db.runSync(
      `INSERT OR IGNORE INTO configuracion (id, ingreso_quincenal)
       VALUES (1, ?);`,
      [12000],
    );

    const categorias = [
      { nombre: "Gastos fijos", porcentaje: 20 },
      { nombre: "Gustos", porcentaje: 50 },
      { nombre: "Inversiones", porcentaje: 30 },
    ];

    categorias.forEach((cat) => {
      db.runSync("INSERT INTO categorias (nombre, porcentaje) VALUES (?, ?)", [
        cat.nombre,
        cat.porcentaje,
      ]);
    });

    db.execSync("PRAGMA application_id = 1");
  }
}
