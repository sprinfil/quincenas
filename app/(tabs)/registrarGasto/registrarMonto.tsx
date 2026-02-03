import { ThemedText } from "@/components/themed-text";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/container";
import Input from "@/components/ui/Input";
import { useCrearGasto } from "@/hooks/gastos/useCrearGasto";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

const registrarMonto = () => {
  const [monto, setMonto] = useState("");
  const { crearGasto } = useCrearGasto();
  const { concepto_id } = useLocalSearchParams<{ concepto_id: string }>();

  return (
    <>
      <Container>
        <ThemedText type="title">Monto</ThemedText>
        <Input
          style={{ marginTop: 20 }}
          placeholder="Monto"
          value={monto}
          keyboardType="numeric"
          onChangeText={setMonto}
          autoFocus
        />
        <View style={{ marginTop: 30 }}>
          <Button
            title="Guardar"
            variant="primary"
            onPress={async () => {
              try {
                await crearGasto({ concepto_id: concepto_id, monto: monto });
                router.push("/registrarGasto");
              } catch (error) {}
            }}
          />
        </View>
      </Container>
    </>
  );
};

export default registrarMonto;
