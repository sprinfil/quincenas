

import { db } from "@/db/database";
import { mapQuincenaConfiguracion } from "./adapterQuincenaConfiguracionWithQuincena";
//CONSULTAR LA QUINCENA CONFIGURACION JUNTO CON SU QUINCENA
//CALCULAR LO GASTADO Y LO DISPONIBLE
//TRAER TODOS LOS GASTOS

export const useGetResumenQuincenaConfiguracionById = () => {
  const getResumenQuincenaConfiguracionById = async (
    id: number | string
  ) => {
    try {
      // 1️⃣ Resumen de quincena configuración
      const row = db.getFirstSync<any>(
        `
        SELECT
          qc.id              AS qc_id,
          qc.quincena_id,
          qc.categoria_id,
          qc.nombre,
          qc.porcentaje,

          q.id               AS quincena_id_real,
          q.fecha_inicio,
          q.fecha_fin,
          q.ingreso,

          COALESCE(SUM(g.monto), 0) AS total_gastado
        FROM quincena_configuracion qc
        LEFT JOIN quincena q 
          ON q.id = qc.quincena_id
        LEFT JOIN gastos g 
          ON g.quincena_configuracion_id = qc.id
        WHERE qc.id = ?
        GROUP BY qc.id;
        `,
        [id],
      );

      if (!row) return null;

      const quincenaConfiguracion = mapQuincenaConfiguracion(row);

      // 2️⃣ Cálculos
      const ingreso = Number(quincenaConfiguracion.quincena?.ingreso ?? 0);
      const porcentaje = Number(quincenaConfiguracion.porcentaje ?? 0);

      const base = ingreso * (porcentaje / 100);
      const disponible = base - quincenaConfiguracion.total_gastado;

      // 3️⃣ Traer todos los gastos
      const gastos = db.getAllSync<{
        id: number;
        concepto_id: number;
        concepto_nombre: string;
        quincena_configuracion_id: number;
        monto: number;
      }>(
        `
        SELECT
          g.id,
          g.concepto_id,
          c.nombre        AS concepto_nombre,
          g.quincena_configuracion_id,
          g.monto
        FROM gastos g
        INNER JOIN conceptos c
          ON c.id = g.concepto_id
        WHERE g.quincena_configuracion_id = ?
        ORDER BY g.id DESC;
        `,
        [id],
      );

      const gastosPorConcepto = db.getAllSync<{
        concepto_id: number;
        concepto_nombre: string;
        total_gastado: number;
      }>(
        `
          SELECT
            c.id            AS concepto_id,
            c.nombre        AS concepto_nombre,
            COALESCE(SUM(g.monto), 0) AS total_gastado
          FROM gastos g
          INNER JOIN conceptos c
            ON c.id = g.concepto_id
          WHERE g.quincena_configuracion_id = ?
            AND c.deleted_at IS NULL
          GROUP BY c.id, c.nombre
          ORDER BY total_gastado DESC;
  `,
        [id],
      );

      // 4️⃣ Return final
      return {
        quincenaConfiguracion,
        base,
        disponible,
        gastos,
        gastosPorConcepto,
      };
    } catch (error) {
      console.error("Error al obtener resumen:", error);
      return null;
    }
  };

  return { getResumenQuincenaConfiguracionById };
};
