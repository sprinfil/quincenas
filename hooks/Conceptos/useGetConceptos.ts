import { db } from "@/db/database";
import { ConceptoConCategoria } from "./conceptos.types";

export const useGetConceptos = () => {
  const getConceptos = (): ConceptoConCategoria[] => {
    return db.getAllSync<ConceptoConCategoria>(`
      SELECT 
        c.id,
        c.nombre,
        c.categoria_id,
        cat.nombre AS categoria_nombre
      FROM conceptos c
      INNER JOIN categorias cat ON cat.id = c.categoria_id
      where c.deleted_at is null
      ORDER BY c.id DESC
    `);
  };

  return {
    getConceptos,
  };
};
