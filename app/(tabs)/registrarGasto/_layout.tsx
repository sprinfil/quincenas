import { Stack } from "expo-router";

export default function ConfiguracionLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Registrar gasto", headerShown: false }}
      />
      <Stack.Screen
        name="registrarMonto"
        options={{ title: "Ingreso", headerShown: false }}
      />
      <Stack.Screen
        name="crearConcepto"
        options={{ title: "Ingreso", headerShown: false }}
      />
    </Stack>
  );
}
