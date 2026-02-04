export type Quincena = {
  id: number | string;
  fecha_inicio: string;
  fecha_fin: string;
  ingreso?: number;
};

export type QuincenaConfiguracion = {
  id: number;
  quincena_id: number | string;
  categoria_id: number;
  nombre: string;
  porcentaje: number;
};

export type DashboardCategoria = {
  titulo: string;
  porcentaje: number;
  base: number;
  disponible: number;
  totalGastado: number;
};

export type QuincenaDashboardResponse = {
  quincena: Quincena;
  detalles: DashboardCategoria[];
};
