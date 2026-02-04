import { ThemedText } from "@/components/themed-text";
import { CreateConcepto } from "@/hooks/Conceptos/conceptos.types";
import { useCreateConcepto } from "@/hooks/Conceptos/useCreateConcepto";
import { useGetConceptoById } from "@/hooks/Conceptos/useGetConceptoById";
import { useUpdateConcepto } from "@/hooks/Conceptos/useUpdateConcepto";
import { useGetCategorias } from "@/hooks/categorias/useGetCategorias";
import { router, useFocusEffect } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Button from "../Button";
import Input from "../Input";
import Card from "../card";

const ConceptoForm = ({
  concepto_id,
}: {
  concepto_id?: number | string | null;
}) => {
  const { getCategorias } = useGetCategorias();
  const categorias = getCategorias();
  const [values, setValues] = useState<CreateConcepto>({
    categoria_id: categorias[0]?.id,
    nombre: "",
  });
  const { createConcepto } = useCreateConcepto();
  const { getConceptoById } = useGetConceptoById();
  const { updateConcepto } = useUpdateConcepto();

  const Guardar = async () => {
    try {
      if (values.categoria_id == null || values.nombre?.length == 0) {
        Alert.alert("Campos incompletos", "Por favor llena todos los campos");
        return;
      }
      if (concepto_id == null) {
        await createConcepto(values);
      } else {
        await updateConcepto({ id: concepto_id, ...values });
      }
    } catch (error) {}
  };

  const getConcepto = async () => {
    const data = await getConceptoById(Number(concepto_id));
    setValues(
      data ?? {
        categoria_id: categorias[0]?.id,
        nombre: "",
      },
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      if (concepto_id) {
        getConcepto();
      }
    }, [concepto_id]),
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedText style={{ marginBottom: 20, marginLeft: 6 }} type="subtitle">
          {concepto_id != null ? values?.nombre : "Crear concepto"}
        </ThemedText>

        <View style={{ marginBottom: 20 }}>
          <Input
            placeholder="Nombre del concepto"
            value={values.nombre}
            onChangeText={(texto) => {
              setValues((prev) => {
                return {
                  ...prev,
                  nombre: texto,
                };
              });
            }}
          />
        </View>

        <Card>
          <View style={{ paddingVertical: 20 }}>
            <ThemedText
              style={{ marginBottom: 20, marginLeft: 6 }}
              type="subtitle"
            >
              Seleccionar categoria
            </ThemedText>

            {categorias.map((categoria) => (
              <Pressable
                key={categoria.id}
                onPress={() =>
                  setValues((prev) => ({
                    ...prev,
                    categoria_id: categoria.id,
                  }))
                }
                style={
                  values.categoria_id === categoria.id
                    ? [styles.categoriaButton, styles.pressed]
                    : styles.categoriaButton
                }
              >
                <ThemedText>{categoria.nombre}</ThemedText>
              </Pressable>
            ))}
          </View>
        </Card>

        <View style={{ marginTop: 20 }}>
          <Button
            title="Guardar"
            variant="primary"
            onPress={async () => {
              await Guardar();
              router.back();
            }}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  categoriaButton: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  pressed: {
    backgroundColor: "rgba(59, 130, 246, 0.15)",
  },
});

export default ConceptoForm;
