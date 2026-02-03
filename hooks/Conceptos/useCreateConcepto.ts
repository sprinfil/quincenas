import { db } from "@/db/database";
import { CreateConcepto } from "./conceptos.types";

export const useCreateConcepto = () => {
  const createConcepto = (data: CreateConcepto) => {
    const { nombre, categoria_id } = data;

    if (!nombre || !categoria_id) {
      throw new Error("Campos incompletos");
    }

    db.runSync(
      `
      INSERT INTO conceptos (
        nombre,
        categoria_id
      ) VALUES (?, ?)
    `,
      [nombre.trim(), categoria_id]
    );
  };

  return {
    createConcepto,
  };
};
