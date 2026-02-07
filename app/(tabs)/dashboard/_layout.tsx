import { Stack } from "expo-router";

export default function ConfiguracionLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Configuración", headerShown: false }}
      />
      {/* <Stack.Screen name="ingresoQuincenal" options={{ title: "Ingreso" }} />
      <Stack.Screen name="categorias" options={{ title: "Categorias" }} />
      <Stack.Screen name="conceptos" options={{ title: "Conceptos" }} /> */}
    </Stack>
  );
}
