import { useEffect, useState } from "react";
import { View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/container";
import { Quincena } from "@/hooks/quincenas/quincenas.types";
import { useCreateQuincena } from "@/hooks/quincenas/useCreateQuincena";
import { useGetQuincenaActiva } from "@/hooks/quincenas/useGetQuincenaActiva";
import { formatDate } from "@/hooks/tools";

export default function HomeScreen() {
  const { getQuincenaActiva } = useGetQuincenaActiva();
  const { createQuincena } = useCreateQuincena();

  const [quincena, setQuincena] = useState<Quincena | null>(null);

  useEffect(() => {
    setQuincena(getQuincenaActiva());
  }, []);

  const handleCreateQuincena = () => {
    createQuincena();
    setQuincena(getQuincenaActiva());
  };
  console.log(quincena);
  return (
    <Container>
      {quincena == null ? (
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
          <ThemedText type="subtitle">
            Inicio de periodo {formatDate(quincena.fecha_inicio)}
          </ThemedText>
        </>
      )}
    </Container>
  );
}
