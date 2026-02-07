import { db } from "@/db/database";
import { Categoria } from "./categorias.types";

export function useGetCategorias() {
  const getCategorias = (): Categoria[] => {
    const result = db.getAllSync<Categoria>(
      "SELECT * FROM categorias WHERE deleted_at IS NULL ORDER BY id DESC"
    );
    return result;
  };

  return {
    getCategorias,
  };
}