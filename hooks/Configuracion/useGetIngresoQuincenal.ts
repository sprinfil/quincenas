import { db } from "@/db/database";

export const useGetIngresoQuincenal = () => {

  const getIngresoQuincenal = () => {
    const result = db.getFirstSync<{
      ingreso_quincenal: number;
    }>("SELECT ingreso_quincenal FROM configuracion WHERE id = 1");

    return result?.ingreso_quincenal ?? 0;
  };
  return {
    getIngresoQuincenal,
  };
  
}