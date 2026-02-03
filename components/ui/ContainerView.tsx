import { Colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";

const ContainerView = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? "light"].background },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

export default ContainerView;
