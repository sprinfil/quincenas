import { ThemedText } from "@/components/themed-text";
import ContainerView from "@/components/ui/ContainerView";
import Input from "@/components/ui/Input";
import { Categoria } from "@/hooks/categorias/categorias.types";
import { useGetCategorias } from "@/hooks/categorias/useGetCategorias";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
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
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [search, setSearch] = useState("");

  const { getCategorias } = useGetCategorias();

  useFocusEffect(
    React.useCallback(() => {
      const data = getCategorias();
      setCategorias(data);
    }, []),
  );

  const filtered = useMemo(() => {
    return categorias.filter((c) =>
      c.nombre.toLowerCase().includes(search.toLowerCase()),
    );
  }, [categorias, search]);

  return (
    <ContainerView>
      <View style={styles.searchContainer}>
        <Input
          style={{ flex: 1 }}
          placeholder="Buscar categoria"
          value={search}
          onChangeText={setSearch}
        />
        <Pressable
          onPress={() => {
            router.push("/configuracion/categorias/crearCategoria");
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
                  pathname: "/configuracion/categorias/editarCategoria",
                  params: {
                    id: concepto.id,
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
                  <ThemedText type="subtitle" style={styles.categoria}>
                    {concepto.porcentaje} %
                  </ThemedText>
                </View>

                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={24}
                  color="#6b7280"
                />
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </ContainerView>
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
