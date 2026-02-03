import { db } from "@/db/database";
import { UpdateConcepto } from "./conceptos.types";



export const useUpdateConcepto = () => {
  const updateConcepto = (data: UpdateConcepto) => {
    const { id, nombre, categoria_id } = data;

    if (!id || !nombre || !categoria_id) {
      throw new Error("Campos incompletos");
    }

    db.runSync(
      `
      UPDATE conceptos
      SET
        nombre = ?,
        categoria_id = ?
      WHERE id = ?
      `,
      [nombre.trim(), categoria_id, id]
    );
  };

  return {
    updateConcepto,
  };
};
