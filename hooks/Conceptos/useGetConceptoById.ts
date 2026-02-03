import { db } from "@/db/database";
import { ConceptoConCategoria } from "./conceptos.types";

export const useGetConceptoById = () => {
  const getConceptoById = (
    id: number | string,
  ): ConceptoConCategoria | null => {
    if (!id) return null;

    const concepto = db.getFirstSync<ConceptoConCategoria>(
      `
      SELECT
        c.id,
        c.nombre,
        c.categoria_id,
        cat.nombre AS categoria_nombre
      FROM conceptos c
      JOIN categorias cat ON cat.id = c.categoria_id
      WHERE c.id = ?
      LIMIT 1
      `,
      [id],
    );

    return concepto ?? null;
  };

  return {
    getConceptoById,
  };
};
