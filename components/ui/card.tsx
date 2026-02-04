import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";

const Card = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={[
        cardStyles.container,
        {
          backgroundColor:
            colorScheme == "dark"
              ? DarkTheme.colors.card
              : DefaultTheme.colors.card,
        },
      ]}
    >
      {children}
    </View>
  );
};

const cardStyles = StyleSheet.create({
  container: {
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 20,
  },
});

export default Card;
