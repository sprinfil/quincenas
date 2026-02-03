import { ThemedText } from "@/components/themed-text";
import Card from "@/components/ui/card";
import { Colors } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Pressable, StyleSheet, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Configuracion() {
  const colorScheme = useColorScheme();
  return (
    <>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: Colors[colorScheme ?? "light"].background },
        ]}
      >
        <ThemedText style={styles.titleContainer} type="title">
          Configuracion
        </ThemedText>
        <Card>
          <Pressable
            onPress={() => router.push("/configuracion/ingresoQuincenal")}
          >
            <View style={styles.buttonConfig}>
              <ThemedText type="default">Ingreso quincenal</ThemedText>
              <Ionicons
                name="arrow-forward-circle-outline"
                size={24}
                color={colorScheme == "dark" ? "white" : "black"}
              />
            </View>
          </Pressable>

          <Pressable onPress={() => router.push("/configuracion/categorias")}>
            <View style={styles.buttonConfig}>
              <ThemedText type="default">Categorias</ThemedText>
              <Ionicons
                name="arrow-forward-circle-outline"
                size={24}
                color={colorScheme == "dark" ? "white" : "black"}
              />
            </View>
          </Pressable>
          <Pressable onPress={() => router.push("/configuracion/conceptos")}>
            <View style={styles.buttonConfig}>
              <ThemedText type="default">Conceptos</ThemedText>
              <Ionicons
                name="arrow-forward-circle-outline"
                size={24}
                color={colorScheme == "dark" ? "white" : "black"}
              />
            </View>
          </Pressable>
          {/* <Button
            title="REINICIAR BD"
            variant="primary"
            onPress={async () => {
              await deleteDatabase();
              alert("BD eliminada, reinicia la app");
            }}
          /> */}
        </Card>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  buttonConfig: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 14,
    borderColor: "#ccc",
  },
});
