import { ThemedText } from "@/components/themed-text";
import { CategoriaFormProps } from "@/hooks/categorias/categorias.types";
import { useCrearCategoria } from "@/hooks/categorias/useCrearCategoria";
import { useEditarCategoria } from "@/hooks/categorias/useEditarCategoria";
import { useGetCategoriaById } from "@/hooks/categorias/useGetCategoriaById";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Button from "../Button";
import ContainerView from "../ContainerView";
import Input from "../Input";

const CategoriaForm = ({
  categoria_id,
}: {
  categoria_id?: number | string | null;
}) => {
  const { crearCategoria } = useCrearCategoria();
  const { editarCategoria } = useEditarCategoria();
  const { getCategoriaById } = useGetCategoriaById();
  const [values, setValues] = useState<CategoriaFormProps>({
    nombre: "",
    porcentaje: 0,
  });

  useEffect(() => {
    if (categoria_id) {
      getCategoria();
    }
  }, [categoria_id]);

  const getCategoria = async () => {
    let categoria = await getCategoriaById(categoria_id);
    setValues({
      nombre: categoria?.nombre,
      porcentaje: categoria?.porcentaje,
    });
  };

  const guardar = async () => {
    if (!values.nombre || values.nombre.trim().length === 0) {
      throw new Error("El nombre es obligatorio");
    }

    if (!values.porcentaje || values.porcentaje <= 0) {
      throw new Error("El porcentaje debe ser mayor a 0");
    }

    if (categoria_id) {
      await editarCategoria(categoria_id, values);
    } else {
      await crearCategoria(values);
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <ContainerView>
            <View
              style={{
                marginBottom: 20,
                display: "flex",
                flexDirection: "row",
                gap: 20,
              }}
            >
              <Input
                autoFocus
                style={{ flex: 1 }}
                placeholder="Nombre de la categoria"
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
              <View
                style={{
                  display: "flex",
                  gap: 8,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ThemedText>%</ThemedText>
                <Input
                  keyboardType="numeric"
                  style={{ minWidth: 100 }}
                  placeholder="Porcentaje"
                  value={String(values.porcentaje)}
                  onChangeText={(texto) => {
                    setValues((prev) => {
                      return {
                        ...prev,
                        porcentaje: Number(texto),
                      };
                    });
                  }}
                />
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Button
                title="Guardar"
                variant="primary"
                onPress={async () => {
                  try {
                    await guardar();
                    router.back();
                  } catch (error) {
                    Alert.alert(
                      "Error",
                      error instanceof Error
                        ? error.message
                        : "Ocurrió un error inesperado",
                    );
                  }
                }}
              />
            </View>
          </ContainerView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default CategoriaForm;
