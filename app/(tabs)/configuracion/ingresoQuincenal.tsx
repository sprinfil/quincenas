import Button from "@/components/ui/Button";
import ContainerView from "@/components/ui/ContainerView";
import Input from "@/components/ui/Input";
import { useGetIngresoQuincenal } from "@/hooks/Configuracion/useGetIngresoQuincenal";
import { useSetIngresoQuincenal } from "@/hooks/Configuracion/useSetIngresoQuincenal";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const IngresoQuincenal = () => {
  const [ingreso, setIngreso] = useState("");
  const { setIngresoQuincenal } = useSetIngresoQuincenal();
  const { getIngresoQuincenal } = useGetIngresoQuincenal();
  const router = useRouter();

  const getIngreso = async () => {
    let ingreso = await getIngresoQuincenal();
    setIngreso(String(ingreso));
  };

  useEffect(() => {
    getIngreso();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <ContainerView>
          <Input
            keyboardType="numeric"
            placeholder="Ingresa tu sueldo"
            value={ingreso}
            onChangeText={setIngreso}
            style={styles.input}
          />
          <View style={{ marginTop: 20 }}>
            <Button
              title="Guardar"
              variant="primary"
              onPress={() => {
                setIngresoQuincenal(Number(ingreso));
                router.back();
              }}
            />
          </View>
        </ContainerView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
  },
});

export default IngresoQuincenal;
