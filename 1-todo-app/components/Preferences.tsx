import { createSettingsStyles } from "@/assets/styles/settings.styles";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Text } from "react-native";
import PreferencesSwitch from "./PreferencesSwitch";

const Preferences = () => {
  const [isAutoSync, setIsAutoSync] = useState(true);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);

  const { isDarkMode, colors, toggleDarkMode } = useTheme();

  const settingsStyle = createSettingsStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingsStyle.section}
    >
      <Text style={settingsStyle.sectionTitle}>Preferences</Text>
      {/* Dark Mode */}
      <PreferencesSwitch
        icon={"moon"}
        label="Dark Mode"
        value={isDarkMode}
        toggle={toggleDarkMode}
        iconColor={colors.gradients.primary}
        trackColor={colors.primary}
      />

      {/* Notificaitons */}
      <PreferencesSwitch
        icon={"notifications"}
        label="Notifications"
        value={isNotificationEnabled}
        toggle={() => {
          setIsNotificationEnabled(!isNotificationEnabled);
        }}
        iconColor={colors.gradients.warning}
        trackColor={colors.warning}
      />

      {/* AutoAsync */}
      <PreferencesSwitch
              icon={"sync"}
              label="Auto Sync"
              value={isAutoSync}
              toggle={() => {
                  setIsAutoSync(!isAutoSync);
              }}
              iconColor={colors.gradients.success}
              trackColor={colors.success}
      />
    </LinearGradient>
  );
};

export default Preferences;
