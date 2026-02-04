import { db } from "@/db/database";
import { CategoriaFormProps } from "./categorias.types";

export const useCrearCategoria = () => {
  const crearCategoria = async (values: CategoriaFormProps) => {
    const { nombre, porcentaje } = values;

    // 🔒 Validaciones básicas
    if (!nombre || nombre.trim().length === 0) {
      throw new Error("El nombre es obligatorio");
    }

    if (porcentaje === undefined || porcentaje === null) {
      throw new Error("El porcentaje es obligatorio");
    }

    if (porcentaje <= 0) {
      throw new Error("El porcentaje debe ser mayor a 0");
    }

    // 🧮 Obtener suma actual de porcentajes
    const result = db.getFirstSync<{
      total: number | null;
    }>(`
      SELECT SUM(porcentaje) AS total
      FROM categorias
    `);

    const totalActual = Number(result?.total ?? 0);
    const totalFinal = totalActual + porcentaje;

    // 🚫 Validación clave
    if (totalFinal > 100) {
      throw new Error(
        `La suma de porcentajes excede el 100%. Actualmente tienes ${totalActual}%.`
      );
    }

    // (Opcional) Si quieres obligar a llegar EXACTAMENTE a 100
    /*
    if (totalFinal !== 100) {
      throw new Error(
        `La suma de porcentajes debe ser exactamente 100%. Actual: ${totalFinal}%.`
      );
    }
    */

    // 🧠 Insert
    const insert = db.runSync(
      `
      INSERT INTO categorias (nombre, porcentaje)
      VALUES (?, ?)
      `,
      [nombre.trim(), porcentaje]
    );

    return {
      id: insert.lastInsertRowId,
      nombre: nombre.trim(),
      porcentaje,
    };
  };

  return { crearCategoria };
};
