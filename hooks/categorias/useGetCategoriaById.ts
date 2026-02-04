import { db } from "@/db/database";
import { Categoria } from "./categorias.types";


export const useGetCategoriaById = () => {
    const getCategoriaById = (
        id: number | string | null | undefined
    ): Categoria | null => {
        if (!id) return null;

        const categoria = db.getFirstSync<Categoria>(
            `
      SELECT
      *
      FROM categorias
      WHERE id = ?
      LIMIT 1
      `,
            [Number(id)]
        );

        return categoria ?? null;
    };

    return { getCategoriaById };
};
