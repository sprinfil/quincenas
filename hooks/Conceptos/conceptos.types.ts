export type CreateConcepto = {
  nombre: string;
  categoria_id: string | number | null;
}

export type Concepto = {
  id: number;
  nombre: string;
  categoria_id: number;
};

export type ConceptoConCategoria = {
  id: number;
  nombre: string;
  categoria_id: number;
  categoria_nombre: string;
};

export type UpdateConcepto = CreateConcepto & {
  id: number | string | null
};