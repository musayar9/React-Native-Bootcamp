import { createSettingsStyles } from "@/assets/styles/settings.styles";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Switch, Text, View } from "react-native";

interface PreferenceSwitchProps {
  icon?: string;
  label?: string;
  value?: boolean | string;
  toggle?: () => void;
  iconColor?: string;
    trackColor: string;
}

const PreferencesSwitch = ({
  icon,
  label,
  value,
  iconColor,
  toggle,
  trackColor
}: PreferenceSwitchProps) => {
  const { colors } = useTheme();

  const settingsStyle = createSettingsStyles(colors);

  return (
    <View style={settingsStyle.settingItem}>
      <View style={settingsStyle.settingLeft}>
        <LinearGradient colors={iconColor} style={settingsStyle.settingIcon}>
          <Ionicons name={icon} size={18} color={"#fff"} />
        </LinearGradient>
        <Text style={settingsStyle.settingText}>{label}</Text>
      </View>

      <Switch
        value={value}
        onValueChange={toggle}
        thumbColor={"#fff"}
        trackColor={{ false: colors.border, true:trackColor }}
        ios_backgroundColor={colors.border}
      />
    </View>
  );
};

export default PreferencesSwitch;
