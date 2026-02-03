import { db } from "@/db/database";
import { GastoConDetalle } from "./gastos.types";

export const useGetGastosByQuincenaId = () => {
  const getGastosByQuincenaId = async (
    quincenaId: number | string | undefined,
  ): Promise<GastoConDetalle[]> => {
    const id = Number(quincenaId);
    if (isNaN(id)) {
      throw new Error("Quincena ID inválido");
    }

    const gastos = db.getAllSync<GastoConDetalle>(
      `
      SELECT
        g.id            AS gasto_id,
        g.monto,

        c.id            AS concepto_id,
        c.nombre        AS concepto_nombre,

        qc.id           AS quincena_configuracion_id,
        qc.categoria_id,

        q.id            AS quincena_id,
        q.fecha_inicio,
        q.fecha_fin
      FROM gastos g
      INNER JOIN quincena_configuracion qc
        ON qc.id = g.quincena_configuracion_id
      INNER JOIN quincenas q
        ON q.id = qc.quincena_id
      INNER JOIN conceptos c
        ON c.id = g.concepto_id
      WHERE q.id = ?
      ORDER BY g.id DESC
    `,
      [id],
    );

    return gastos;
  };

  return { getGastosByQuincenaId };
};
