import { db } from "@/db/database";

export const useSetIngresoQuincenal = () => {
  const setIngresoQuincenal = (ingreso: number) => {
    db.runSync(
      `INSERT OR REPLACE INTO configuracion (id, ingreso_quincenal)
       VALUES (1, ?);`,
      [ingreso]
    );
  };
  return {
    setIngresoQuincenal
  }
}