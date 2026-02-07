import { ThemedText } from "@/components/themed-text";
import ContainerView from "@/components/ui/ContainerView";
import Input from "@/components/ui/Input";
import { ConceptoConCategoria } from "@/hooks/Conceptos/conceptos.types";
import { useGetConceptos } from "@/hooks/Conceptos/useGetConceptos";
import { useSoftDeleteConcepto } from "@/hooks/Conceptos/useSoftDeleteConcepto";
import { handlePressWithConfirmation } from "@/hooks/tools";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { router, useFocusEffect } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

const conceptos = () => {
  const colorScheme = useColorScheme();
  const { getConceptos } = useGetConceptos();
  const [conceptos, setConceptos] = useState<ConceptoConCategoria[]>([]);
  const [search, setSearch] = useState("");
  const { softDeleteConcepto } = useSoftDeleteConcepto();

  useFocusEffect(
    React.useCallback(() => {
      fetchConceptos();
    }, []),
  );

  const fetchConceptos = async () => {
    const data = getConceptos();
    setConceptos(data);
  };

  const deleteConcepto = async (id: number | string | null | undefined) => {
    try {
      await softDeleteConcepto(id);
      console.log("concepto borrado");
      fetchConceptos();
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = useMemo(() => {
    return conceptos.filter((c) =>
      c.nombre.toLowerCase().includes(search.toLowerCase()),
    );
  }, [conceptos, search]);

  return (
    <ContainerView>
      <View style={styles.searchContainer}>
        <Input
          style={{ flex: 1 }}
          placeholder="Buscar concepto"
          value={search}
          onChangeText={setSearch}
        />
        <Pressable
          onPress={() => {
            router.push("/configuracion/conceptos/crearConcepto");
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
            <View
              key={index}
              style={{ display: "flex", flexDirection: "row", gap: 13 }}
            >
              <Pressable
                key={concepto.id}
                onPress={() => {
                  router.push({
                    pathname: "/configuracion/conceptos/editarConcepto",
                    params: {
                      id: concepto.id,
                    },
                  });
                }}
                style={{ flex: 1 }}
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

                  <MaterialCommunityIcons
                    name="pencil-outline"
                    size={24}
                    color="#6b7280"
                  />
                </View>
              </Pressable>
              <TouchableOpacity
                style={{
                  width: 38,
                  alignSelf: "stretch",
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  handlePressWithConfirmation("¿Estás seguro?", "", () => {
                    deleteConcepto(concepto?.id);
                  });
                }}
              >
                <FontAwesome6 name="trash-alt" size={24} color="#ef4444" />
              </TouchableOpacity>
            </View>
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
