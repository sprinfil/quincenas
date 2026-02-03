import ConceptoForm from "@/components/ui/conceptoForm/conceptoForm";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const editarConcepto = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <ConceptoForm concepto_id={id} />;
};

export default editarConcepto;
