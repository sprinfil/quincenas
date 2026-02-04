import { db } from "@/db/database";
import { Quincena, QuincenaConfiguracion } from "./quincenas.types";

type QuincenaConConfiguracion = Quincena & {
  configuraciones: QuincenaConfiguracion[];
};

export const useGetQuincenaActivaConConf = () => {
  const getQuincenaActivaConConf = (): QuincenaConConfiguracion | null => {
    const rows = db.getAllSync<any>(`
      SELECT
        q.id            AS quincena_id,
        q.fecha_inicio,
        q.fecha_fin,
        q.ingreso,

        qc.id           AS config_id,
        qc.categoria_id,
        qc.nombre       AS config_nombre,
        qc.porcentaje
      FROM quincenas q
      LEFT JOIN quincena_configuracion qc
        ON qc.quincena_id = q.id
      WHERE q.fecha_fin IS NULL
      ORDER BY q.id DESC
    `);

    if (rows.length === 0) return null;

    const quincena: QuincenaConConfiguracion = {
      id: rows[0].quincena_id,
      fecha_inicio: rows[0].fecha_inicio,
      fecha_fin: rows[0].fecha_fin,
      ingreso: Number(rows[0].ingreso),
      configuraciones: [],
    };

    rows.forEach((row) => {
      if (row.config_id) {
        quincena.configuraciones.push({
          id: row.config_id,
          quincena_id: quincena.id,
          categoria_id: row.categoria_id,
          nombre: row.config_nombre,
          porcentaje: row.porcentaje,
        });
      }
    });

    return quincena;
  };

  return { getQuincenaActivaConConf };
};
