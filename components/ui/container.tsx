import { Colors } from "@/constants/theme";
import React from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Container = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: Colors[colorScheme ?? "light"].background },
        ]}
      >
        {children}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
});

export default Container;
