import React, { useState, useCallback, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Stack } from "expo-router";
import TaskInput from "../components/TaskInput";
import Task from "../components/Task";
import Toast from "../components/Toast";
import { Task as TaskType } from "../types/task";

export default function Index() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: "success" | "error" | "info";
  }>({
    visible: false,
    message: "",
    type: "info",
  });

  // Show toast message
  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "info") => {
      setToast({ visible: true, message, type });
    },
    []
  );

  // Hide toast message
  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  const addTask = (text: string) => {
    const newTask: TaskType = {
      id: Date.now().toString(),
      text,
      completed: false,
      completedAt: null,
    };
    setTasks([newTask, ...tasks]);
    showToast(`Task added: ${text}`, "success");
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const completed = !task.completed;
          return {
            ...task,
            completed,
            completedAt: completed ? new Date().toISOString() : null,
          };
        }
        return task;
      })
    );

    const task = tasks.find((t) => t.id === id);
    if (task) {
      showToast(
        task.completed
          ? `Task marked as incomplete: ${task.text}`
          : `Task completed: ${task.text}`,
        "info"
      );
    }
  };

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find((t) => t.id === id);
    setTasks(tasks.filter((task) => task.id !== id));

    if (taskToDelete) {
      showToast(`Task deleted: ${taskToDelete.text}`, "error");
    }
  };

  // Sort tasks: incomplete first, then completed (most recently completed first)
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      // If one is completed and the other is not
      if (a.completed && !b.completed) return 1;
      if (!a.completed && b.completed) return -1;

      // If both are completed, sort by completedAt (most recent first)
      if (a.completed && b.completed) {
        if (!a.completedAt || !b.completedAt) return 0;
        return (
          new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
        );
      }

      // If both are incomplete, keep original order
      return 0;
    });
  }, [tasks]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Task Manager",
          headerStyle: {
            backgroundColor: "#f8f8f8",
          },
          headerShadowVisible: false,
        }}
      />
      <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />

      <View style={styles.content}>
        <TaskInput onAddTask={addTask} />

        {tasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              No tasks yet. Add a task to get started!
            </Text>
          </View>
        ) : (
          <FlatList
            data={sortedTasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Task
                id={item.id}
                text={item.text}
                completed={item.completed}
                onToggleComplete={toggleComplete}
                onDelete={deleteTask}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}

        <Toast
          visible={toast.visible}
          message={toast.message}
          type={toast.type}
          onHide={hideToast}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
});
