import React, { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/card";
import Container from "@/components/ui/container";
import { CorteQuincenaButton } from "@/components/ui/CorteQuincenaButton";
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
    // console.log(quincena);
  };

  const handleCreateQuincena = async () => {
    await createQuincena();
    let quincena = await getQuincenaDashboard();
    setDashboard(quincena);
  };
  // console.log(dashboard);

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
            <View
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              <ThemedText type="title">Resumen</ThemedText>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ThemedText>Fecha de inicio</ThemedText>
                <ThemedText>
                  {formatDate(dashboard.quincena.fecha_inicio)}
                </ThemedText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ThemedText>Ingreso</ThemedText>
                <ThemedText>
                  {formatPesos(dashboard.quincena?.ingreso ?? 0)}
                </ThemedText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ThemedText>Total gastado </ThemedText>
                <ThemedText style={{ color: "#ef4444" }}>
                  {formatPesos(dashboard.quincena?.totalGastado ?? 0)}
                </ThemedText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ThemedText>Disponible </ThemedText>
                <ThemedText>
                  {formatPesos(
                    Number(
                      (dashboard.quincena?.ingreso ?? 0) -
                        dashboard.quincena?.totalGastado,
                    ) ?? 0,
                  )}
                </ThemedText>
              </View>
            </View>

            <View
              style={{
                marginTop: 20,
                paddingLeft: 12,
                paddingRight: 12,
              }}
            >
              <CorteQuincenaButton
                onPress={() => {
                  handlePressWithConfirmation(
                    "Seguro",
                    "¿Estás seguro de hacer el corte? Esta acción no se puede deshacer.",
                    handleCreateQuincena,
                  );
                }}
              />
            </View>
            <View
              style={{ flex: 1, gap: 12, paddingBottom: 40, marginTop: 60 }}
            >
              {dashboard.detalles?.map((detalle, index) => (
                <Pressable key={index}>
                  <Card key={index}>
                    <View style={{ gap: 6, paddingTop: 10, paddingBottom: 10 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <ThemedText type="subtitle">
                          {detalle.titulo}
                        </ThemedText>
                        <ThemedText style={{ opacity: 0.7 }}>
                          {detalle.porcentaje}%
                        </ThemedText>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <ThemedText>Base</ThemedText>
                        <ThemedText>{formatPesos(detalle.base)}</ThemedText>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <ThemedText>Gastado</ThemedText>
                        <ThemedText style={{ color: "#ef4444" }}>
                          {formatPesos(detalle.totalGastado)}
                        </ThemedText>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 6,
                        }}
                      >
                        <ThemedText>Disponible</ThemedText>
                        <ThemedText style={{ color: "#22c55e" }}>
                          {formatPesos(detalle.disponible)}
                        </ThemedText>
                      </View>
                    </View>
                  </Card>
                </Pressable>
              ))}
            </View>
            <View style={{ marginTop: 30 }}>
              {/* <Button
                title="Hacer corte"
                variant="secondary"
                onPress={() =>
                  handlePressWithConfirmation(
                    "Seguro",
                    "¿Estás seguro de hacer el corte? Esta acción no se puede deshacer.",
                    handleCreateQuincena,
                  )
                }
              /> */}
            </View>
          </ScrollView>
        </>
      )}
    </Container>
  );
}
