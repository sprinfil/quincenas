import { QuincenaConfiguracionWithQuincena } from "./quincenaConfiguracion.types";

export const mapQuincenaConfiguracion = (row: any): QuincenaConfiguracionWithQuincena => ({
  id: row.qc_id,
  quincena_id: row.quincena_id,
  categoria_id: row.categoria_id,
  nombre: row.nombre,
  porcentaje: row.porcentaje,
  total_gastado: row.total_gastado ?? 0,
  quincena: row.quincena_id_real
    ? {
      id: row.quincena_id_real,
      fecha_inicio: row.fecha_inicio,
      fecha_fin: row.fecha_fin,
      ingreso: row.ingreso ?? 0,
    }
    : null,
});