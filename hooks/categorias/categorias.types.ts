export type Categoria = {
  id: number;
  nombre: string;
  porcentaje: number;
};

export type CategoriaFormProps = {
  nombre: string | undefined;
  porcentaje: number | undefined;
};