export type GastoConDetalle = {
  gasto_id: number;
  monto: number;

  concepto_id: number;
  concepto_nombre: string;

  quincena_configuracion_id: number;
  categoria_id: number;

  quincena_id: number;
  fecha_inicio: string;
  fecha_fin: string | null;
};
