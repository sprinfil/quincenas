import { db } from "@/db/database";
import { CategoriaFormProps } from "./categorias.types";

export const useEditarCategoria = () => {
  const editarCategoria = async (
    id: number | string | null,
    values: CategoriaFormProps
  ) => {
    const { nombre, porcentaje } = values;

    // 🔒 Validaciones básicas
    if (!id) {
      throw new Error("ID de categoría inválido");
    }

    if (!nombre || nombre.trim().length === 0) {
      throw new Error("El nombre es obligatorio");
    }

    if (porcentaje === undefined || porcentaje === null) {
      throw new Error("El porcentaje es obligatorio");
    }

    if (porcentaje <= 0) {
      throw new Error("El porcentaje debe ser mayor a 0");
    }

    // 📌 Obtener porcentaje actual de la categoría
    const categoriaActual = db.getFirstSync<{
      porcentaje: number;
    }>(
      `
      SELECT porcentaje
      FROM categorias
      WHERE id = ?
      `,
      [id]
    );

    if (!categoriaActual) {
      throw new Error("La categoría no existe");
    }

    // 🧮 Obtener suma total de porcentajes
    const suma = db.getFirstSync<{
      total: number | null;
    }>(`
      SELECT SUM(porcentaje) AS total
      FROM categorias where deleted_at is null
    `);

    const totalActual = Number(suma?.total ?? 0);

    // 🔄 Recalcular total final
    const totalFinal =
      totalActual - categoriaActual.porcentaje + porcentaje;

    // 🚫 Validación clave
    if (totalFinal > 100) {
      throw new Error(
        `La suma de porcentajes excede el 100%. Actualmente quedaría en ${totalFinal}%.`
      );
    }

    // (Opcional) Exactamente 100
    /*
    if (totalFinal !== 100) {
      throw new Error(
        `La suma de porcentajes debe ser exactamente 100%. Total actual: ${totalFinal}%.`
      );
    }
    */

    // ✏️ Update
    db.runSync(
      `
      UPDATE categorias
      SET nombre = ?, porcentaje = ?
      WHERE id = ?
      `,
      [nombre.trim(), porcentaje, id]
    );

    return {
      id,
      nombre: nombre.trim(),
      porcentaje,
    };
  };

  return { editarCategoria };
};
