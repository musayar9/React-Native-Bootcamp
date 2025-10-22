import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { COLORS } from "../constants/colors.js";
const SafeScreen = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top, paddingBottom:insets.bottom, flex: 1, backgroundColor: COLORS.background }}>
      {children}
    </View>
  );
};

export default SafeScreen;

const styles = StyleSheet.create({});
