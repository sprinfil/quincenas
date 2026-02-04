import CategoriaForm from "@/components/ui/categoriaForm/categoriaForm";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const editarCategoria = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <CategoriaForm categoria_id={id} />;
};

export default editarCategoria;
