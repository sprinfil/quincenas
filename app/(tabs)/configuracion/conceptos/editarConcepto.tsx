import ConceptoForm from "@/components/ui/conceptoForm/conceptoForm";
import ContainerView from "@/components/ui/ContainerView";
import { useLocalSearchParams } from "expo-router";
import React from "react";

const editarConcepto = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <>
      <ContainerView>
        <ConceptoForm concepto_id={id} />
      </ContainerView>
    </>
  );
};

export default editarConcepto;
