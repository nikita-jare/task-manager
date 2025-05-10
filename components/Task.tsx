import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type TaskProps = {
  id: string;
  text: string;
  completed: boolean;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
};

const Task = ({
  id,
  text,
  completed,
  onToggleComplete,
  onDelete,
}: TaskProps) => {
  return (
    <View style={styles.task}>
      <TouchableOpacity
        style={styles.taskTextContainer}
        onPress={() => onToggleComplete(id)}
      >
        <View style={[styles.checkbox, completed && styles.checkboxChecked]}>
          {completed && <Ionicons name="checkmark" size={16} color="white" />}
        </View>
        <Text style={[styles.taskText, completed && styles.taskTextCompleted]}>
          {text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onDelete(id)}
        style={styles.deleteButton}
      >
        <Ionicons name="trash-outline" size={22} color="#ff4d4d" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  taskTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#3478F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: "#3478F6",
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  deleteButton: {
    padding: 5,
  },
});

export default Task;
