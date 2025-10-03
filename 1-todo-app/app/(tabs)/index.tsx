import { createHomeStyles } from "@/assets/styles/home.styles";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StatusBar, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Index = () => {
  const { toggleDarkMode, colors } = useTheme();
  const styles = createHomeStyles(colors);

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={styles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={styles.safeArea}>
        <Header />
        <TodoInput/>
        <TouchableOpacity onPress={toggleDarkMode}>
          <Text> Toggle the mode</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Index;
