import { db } from "@/db/database";
import { Categoria } from "./categorias.types";

export function useGetCategorias() {
  const getCategorias = (): Categoria[] => {
    const result = db.getAllSync<Categoria>(
      "SELECT * FROM categorias ORDER BY id ASC"
    );
    return result;
  };

  return {
    getCategorias,
  };
}