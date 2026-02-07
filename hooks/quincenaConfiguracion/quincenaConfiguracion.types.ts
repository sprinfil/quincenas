
export type QuincenaConfiguracion = {
  id: string | number;
  quincena_id: string | number;
  categoria_id: string | number;
  nombre: string;
  porcentaje: string | number;
}

export type QuincenaConfiguracionWithQuincena = {
  id: string | number;          // qc_id
  quincena_id: string | number;
  categoria_id: string | number;
  nombre: string;
  porcentaje: string | number;
    total_gastado: number;
  quincena: {
    id: string | number;
    fecha_inicio: string;
    fecha_fin: string;
    ingreso?: number;
  } | null;
};