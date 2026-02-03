import { ThemedText } from "@/components/themed-text";
import Card from "@/components/ui/card";
import ContainerView from "@/components/ui/ContainerView";
import { useGetCategorias } from "@/hooks/categorias/useGetCategorias";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

const categorias = () => {
  const { getCategorias } = useGetCategorias();
  const categorias = getCategorias();

  return (
    <ContainerView>
      <Card>
        {categorias?.map((categoria, index) => {
          return (
            <Pressable key={index}>
              <View style={styles.buttonConfig}>
                <ThemedText type="default">{categoria?.nombre}</ThemedText>
                <ThemedText type="default">
                  {categoria?.porcentaje} %
                </ThemedText>
              </View>
            </Pressable>
          );
        })}
      </Card>
    </ContainerView>
  );
};
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

export default categorias;
