import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type TaskInputProps = {
  onAddTask: (text: string) => void;
};

const TaskInput = ({ onAddTask }: TaskInputProps) => {
  const [taskText, setTaskText] = useState("");

  const handleAddTask = () => {
    if (taskText.trim() !== "") {
      onAddTask(taskText.trim());
      setTaskText("");
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new task..."
        value={taskText}
        onChangeText={setTaskText}
        onSubmitEditing={handleAddTask}
        returnKeyType="done"
      />
      <TouchableOpacity
        style={[styles.addButton, !taskText.trim() && styles.addButtonDisabled]}
        onPress={handleAddTask}
        disabled={!taskText.trim()}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: "#3478F6",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  addButtonDisabled: {
    backgroundColor: "#A0C0F0",
  },
});

export default TaskInput;
