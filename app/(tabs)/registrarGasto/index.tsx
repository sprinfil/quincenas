import { ThemedText } from "@/components/themed-text";
import Container from "@/components/ui/container";
import Input from "@/components/ui/Input";
import { ConceptoConCategoria } from "@/hooks/Conceptos/conceptos.types";
import { useGetConceptos } from "@/hooks/Conceptos/useGetConceptos";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { router, useFocusEffect } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

const conceptos = () => {
  const colorScheme = useColorScheme();
  const { getConceptos } = useGetConceptos();
  const [conceptos, setConceptos] = useState<ConceptoConCategoria[]>([]);
  const [search, setSearch] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const data = getConceptos();
      setConceptos(data);
    }, []),
  );

  const filtered = useMemo(() => {
    return conceptos.filter((c) =>
      c.nombre.toLowerCase().includes(search.toLowerCase()),
    );
  }, [conceptos, search]);

  return (
    <Container>
      <View style={styles.searchContainer}>
        <Input
          style={{ flex: 1 }}
          placeholder="Buscar concepto"
          value={search}
          onChangeText={setSearch}
        />
        <Pressable
          onPress={() => {
            router.push("/registrarGasto/crearConcepto");
          }}
        >
          <View style={{ paddingLeft: 10 }}>
            <AntDesign
              name="plus-circle"
              size={24}
              color={colorScheme == "dark" ? "white" : "black"}
            />
          </View>
        </Pressable>
      </View>
      <View style={{ marginTop: 20, flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {filtered.map((concepto, index) => (
            <Pressable
              key={concepto.id}
              onPress={() => {
                router.push({
                  pathname: "/registrarGasto/registrarMonto",
                  params: {
                    concepto_id: concepto.id,
                  },
                });
              }}
            >
              <View
                key={concepto.id}
                style={[
                  styles.item,
                  {
                    backgroundColor:
                      colorScheme == "dark"
                        ? DarkTheme.colors.card
                        : DefaultTheme.colors.card,
                  },
                ]}
              >
                <View style={styles.textContainer}>
                  <ThemedText type="subtitle">{concepto.nombre}</ThemedText>
                  <ThemedText type="default" style={styles.categoria}>
                    {concepto.categoria_nombre}
                  </ThemedText>
                </View>

                <Ionicons
                  name="arrow-forward-circle-outline"
                  size={24}
                  color={colorScheme == "dark" ? "white" : "black"}
                />
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderRadius: 12,
    // backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
  },
  categoria: {
    marginTop: 4,
    opacity: 0.6,
    fontSize: 13,
  },
});

export default conceptos;
