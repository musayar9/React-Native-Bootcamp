import { createSettingsStyles } from "@/assets/styles/settings.styles";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

interface ProgressStatBarProps {
  icon: string;
  borderLeft: string;
  value: number | string;
  label: string;
  iconColor:string
}

const ProgressStatBar = ({
  icon,
  borderLeft,
  value,
  label,
  iconColor
}: ProgressStatBarProps) => {
  const { colors } = useTheme();
  const settingsStyle = createSettingsStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={[settingsStyle.statCard, { borderLeftColor: borderLeft }]}
    >
      <View style={settingsStyle.statIconContainer}>
        <LinearGradient
          colors={iconColor}
          style={settingsStyle.statIcon}
        >
          <Ionicons name={icon} size={20} color={"#fff"} />
        </LinearGradient>
      </View>

      <View style={settingsStyle.statInfo}>
        <Text style={settingsStyle.statNumber}>{value}</Text>
        <Text style={settingsStyle.statLabel}>{label}</Text>
      </View>
    </LinearGradient>
  );
};

export default ProgressStatBar;
