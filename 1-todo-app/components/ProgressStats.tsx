import { createSettingsStyles } from "@/assets/styles/settings.styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";
import ProgressStatBar from "./ProgressStatBar";

const ProgressStats = () => {
  const { colors } = useTheme();
  const settingsStyle = createSettingsStyles(colors);

  const todos = useQuery(api.todos.getTodos);

  const totalTodos = todos ? todos.length : 0;
  const completedTodos = todos
    ? todos.filter((todo) => todo.isCompleted).length
    : 0;
  const activeTodos = totalTodos - completedTodos;
  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingsStyle.section}
    >
      <Text style={settingsStyle.sectionTitle}>ProgressStats</Text>
      <View style={settingsStyle.statsContainer}>
        <ProgressStatBar
          icon="list"
          borderLeft={colors.primary}
          value={totalTodos}
          label={"Total Todos"}
          iconColor={colors.gradients.primary}
        />
        <ProgressStatBar
          icon="checkmark-circle"
          borderLeft={colors.success}
          value={completedTodos}
          label={"Completed"}
          iconColor={colors.gradients.success}
        />
        <ProgressStatBar
          icon="time"
          borderLeft={colors.warning}
          value={activeTodos}
          label={"Active "}
          iconColor={colors.gradients.warning}
        />
      </View>
    </LinearGradient>
  );
};

export default ProgressStats;
