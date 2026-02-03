import { ThemedText } from "@/components/themed-text";
import { Colors } from "@/constants/theme";
import { StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegistrarGasto() {
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
          Nuevo gasto
        </ThemedText>
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
  },
});
