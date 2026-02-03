import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="registrarGasto"
        options={{
          title: "Gasto",
          tabBarIcon: ({ color }) => (
            <Entypo name="plus" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="quincenas"
        options={{
          title: "Quincenas",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="attach-money" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="configuracion"
        options={{
          title: "Configuracion",
          tabBarIcon: ({ color }) => (
            <Octicons name="gear" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
