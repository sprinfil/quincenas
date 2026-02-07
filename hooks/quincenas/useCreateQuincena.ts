import { db } from "@/db/database";

export const useCreateQuincena = () => {
  const createQuincena = () => {
    const today = new Date().toLocaleDateString("en-CA");


    db.runSync("BEGIN TRANSACTION");

    try {
      // 1️⃣ Buscar quincena activa
      const quincenaActiva = db.getFirstSync<{ id: number }>(`
        SELECT id
        FROM quincenas
        WHERE fecha_fin IS NULL
        ORDER BY id DESC
        LIMIT 1
      `);

      // 2️⃣ Cerrar quincena activa si existe
      if (quincenaActiva) {
        db.runSync(
          `
          UPDATE quincenas
          SET fecha_fin = ?
          WHERE id = ?
        `,
          [today, quincenaActiva.id]
        );
      }

      // 3️⃣ Obtener ingreso quincenal
      const configuracion = db.getFirstSync<{
        ingreso_quincenal: number;
      }>(`
        SELECT ingreso_quincenal
        FROM configuracion
        WHERE id = 1
      `);

      if (!configuracion) {
        throw new Error("No existe la configuración de ingreso quincenal");
      }

      // 4️⃣ Crear nueva quincena
      db.runSync(
        `
        INSERT INTO quincenas (
          fecha_inicio,
          fecha_fin,
          ingreso
        ) VALUES (?, ?, ?)
      `,
        [today, null, configuracion.ingreso_quincenal]
      );

      const quincenaId =
        db.getFirstSync<{ id: number }>(
          "SELECT last_insert_rowid() AS id"
        )!.id;

      // 5️⃣ Obtener categorias base
      const categorias = db.getAllSync<{
        id: number;
        nombre: string;
        porcentaje: number;
      }>(`
        SELECT id, nombre, porcentaje
        FROM categorias where deleted_at is null
      `);

      // 6️⃣ Crear configuracion por categoria para la quincena
      categorias.forEach(cat => {
        db.runSync(
          `
          INSERT INTO quincena_configuracion (
            quincena_id,
            categoria_id,
            nombre,
            porcentaje
          ) VALUES (?, ?, ?, ?)
        `,
          [quincenaId, cat.id, cat.nombre, cat.porcentaje]
        );
      });

      db.runSync("COMMIT");
    } catch (error) {
      db.runSync("ROLLBACK");
      throw error;
    }
  };

  return {
    createQuincena,
  };
};
