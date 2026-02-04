import { Stack } from "expo-router";

export default function ConfiguracionLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Categorias", headerShown: false }}
      />
      <Stack.Screen
        name="crearCategoria"
        options={{ title: "Crear categoria", headerShown: false }}
      />
      <Stack.Screen
        name="editarCategoria"
        options={{ title: "Editar categoria", headerShown: false }}
      />
    </Stack>
  );
}
