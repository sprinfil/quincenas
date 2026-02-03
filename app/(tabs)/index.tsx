import React, { useState } from "react";
import { ScrollView, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/card";
import Container from "@/components/ui/container";
import { QuincenaDashboardResponse } from "@/hooks/quincenas/quincenas.types";
import { useCreateQuincena } from "@/hooks/quincenas/useCreateQuincena";
import { useGetQuincenaDashboard } from "@/hooks/quincenas/useGetQuincenaDashboard";
import {
  formatDate,
  formatPesos,
  handlePressWithConfirmation,
} from "@/hooks/tools";
import { useFocusEffect } from "expo-router";

export default function HomeScreen() {
  // const { getQuincenaActiva } = useGetQuincenaActiva();
  const { createQuincena } = useCreateQuincena();

  const [dashboard, setDashboard] = useState<QuincenaDashboardResponse | null>(
    null,
  );
  const { getQuincenaDashboard, loading } = useGetQuincenaDashboard();

  useFocusEffect(
    React.useCallback(() => {
      getQuincena();
    }, []),
  );

  const getQuincena = async () => {
    let quincena = await getQuincenaDashboard();
    setDashboard(quincena);
    console.log(quincena);
  };

  const handleCreateQuincena = async () => {
    await createQuincena();
    let quincena = await getQuincenaDashboard();
    setDashboard(quincena);
  };
  console.log(dashboard);

  return (
    <Container>
      {dashboard == null ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Button
            title="Iniciar periodo"
            variant="primary"
            onPress={handleCreateQuincena}
          />
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 40,
            }}
          >
            <ThemedText type="subtitle" style={{ marginBottom: 20 }}>
              Inicio de periodo {formatDate(dashboard.quincena.fecha_inicio)}
            </ThemedText>

            <View style={{ marginBottom: 30 }}>
              <Button
                title="Hacer corte"
                variant="primary"
                onPress={() =>
                  handlePressWithConfirmation(
                    "Seguro",
                    "¿Estás seguro de hacer el corte de quincena? Esta acción no se puede deshacer.",
                    handleCreateQuincena,
                  )
                }
              />
            </View>

            <View style={{ gap: 10 }}>
              {dashboard.detalles?.map((detalle, index) => (
                <Card key={index}>
                  <View style={{ paddingVertical: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <ThemedText type="subtitle">{detalle.titulo}</ThemedText>
                      <ThemedText type="subtitle">
                        {detalle.porcentaje} %
                      </ThemedText>
                    </View>

                    <ThemedText>Base: {formatPesos(detalle.base)}</ThemedText>
                    <ThemedText>
                      Gastado: {formatPesos(detalle.totalGastado)}
                    </ThemedText>
                    <ThemedText style={{ marginTop: 20 }}>
                      Disponible: {formatPesos(detalle.disponible)}
                    </ThemedText>
                  </View>
                </Card>
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </Container>
  );
}
