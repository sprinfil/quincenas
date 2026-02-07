import { FontAwesome6 } from "@expo/vector-icons";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    useColorScheme,
} from "react-native";

type CorteButtonProps = {
  onPress: () => void;
};

export const CorteQuincenaButton = ({ onPress }: CorteButtonProps) => {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const backgroundColor = isDark ? "#2563eb" : "#3b82f6"; // azul elegante
  const textColor = "#ffffff";
  const subTextColor = isDark ? "#dbeafe" : "#eff6ff";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View style={styles.iconContainer}>
        <FontAwesome6 name="calendar-check" size={22} color={textColor} />
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: textColor }]}>
          Hacer corte de quincena
        </Text>
        <Text style={[styles.subtitle, { color: subTextColor }]}>
          Cierra ingresos y reinicia el periodo
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    gap: 14,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    marginTop: 2,
    fontSize: 13,
  },
});
