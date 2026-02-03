import { db } from "@/db/database";
import { Quincena } from "./quincenas.types";

export const useGetQuincenas = () => {
    const getQuincenas = (): Quincena[] => {
        const result = db.getAllSync<Quincena>(`
      SELECT 
      *
      FROM quincenas
      ORDER BY fecha_inicio DESC
    `);

        return result;
    };

    return {
        getQuincenas,
    };
}