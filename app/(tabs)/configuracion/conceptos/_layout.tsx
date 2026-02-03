import { Stack } from "expo-router";

export default function ConfiguracionLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "conceptos", headerShown: false }}
      />
      <Stack.Screen
        name="crearConcepto"
        options={{ title: "Crear concepto", headerShown: false }}
      />
      <Stack.Screen
        name="editarConcepto"
        options={{ title: "Editar", headerShown: false }}
      />
      {/*
      <Stack.Screen name="categorias" options={{ title: "Categorias" }} />
      <Stack.Screen name="conceptos" options={{ title: "Conceptos" }} /> */}
    </Stack>
  );
}
