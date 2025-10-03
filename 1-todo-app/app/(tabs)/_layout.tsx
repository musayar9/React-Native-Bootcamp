import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

interface TabIconProps {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  size: number;
}
const TabIcon: React.FC<TabIconProps> = ({ name, color, size }) => {
  return <Ionicons name={name} color={color} size={size} />;
};

const TabsLayout = () => {
const {colors} = useTheme()
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor:colors.textMuted,
        tabBarStyle: {
          backgroundColor:colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 90,
          paddingBottom: 30,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Todos",
          tabBarIcon: ({ color, size }) => (
            // <Ionicons name="flash-outline" color={color} size={size} />
            <TabIcon name="flash-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            // <Ionicons name="settings" size={size} color={color} />
            <TabIcon name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
