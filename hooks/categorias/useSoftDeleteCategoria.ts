import { db } from "@/db/database";
import { useSoftDeleteConcepto } from "../Conceptos/useSoftDeleteConcepto";


export const useSoftDeleteCategoria = () => {
  const { softDeleteConcepto } = useSoftDeleteConcepto();

  const softDeleteCategoria = (
    id: number | string | null | undefined
  ): boolean => {
    if (!id) return false;

    const categoriaId = Number(id);
    const now = new Date().toISOString();

    try {
      db.execSync("BEGIN");

      // 1️⃣ Obtener conceptos de la categoría
      const conceptos =
        db.getAllSync<{ id: number }>(`
          SELECT id
          FROM conceptos
          WHERE categoria_id = ${categoriaId}
            AND deleted_at IS NULL
        `) ?? [];

      // 2️⃣ Soft delete de conceptos
      for (const concepto of conceptos) {
        softDeleteConcepto(concepto.id);
      }

      // 3️⃣ Soft delete de categoría
      db.execSync(`
        UPDATE categorias
        SET deleted_at = '${now}'
        WHERE id = ${categoriaId}
          AND deleted_at IS NULL
      `);

      db.execSync("COMMIT");
      return true;
    } catch (error) {
      db.execSync("ROLLBACK");
      console.error("Error soft deleting categoria:", error);
      return false;
    }
  };

  return { softDeleteCategoria };
};
