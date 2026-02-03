import { db } from "@/db/database";
import { Quincena } from "./quincenas.types";

export const useGetQuincenaActiva = () => {
  const getQuincenaActiva = (): Quincena | null => {
    const result = db.getFirstSync<Quincena>(`
      SELECT *
      FROM quincenas
      WHERE fecha_fin IS NULL
      ORDER BY id DESC
      LIMIT 1
    `);

    return result ?? null;
  };

  return {
    getQuincenaActiva,
  };
};