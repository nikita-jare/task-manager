import React, { useEffect, useMemo } from "react";
import { StyleSheet, Text, Animated } from "react-native";

type ToastProps = {
  message: string;
  visible: boolean;
  type?: "success" | "error" | "info";
  onHide: () => void;
};

const Toast = ({ message, visible, type = "info", onHide }: ToastProps) => {
  const opacity = useMemo(() => new Animated.Value(0), []);
  const translateY = useMemo(() => new Animated.Value(-15), []);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after delay
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: -15,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          onHide();
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible, onHide, opacity, translateY]);

  if (!visible) return null;

  // More subtle colors
  const backgroundColor =
    type === "success" ? "#E7F5E8" : type === "error" ? "#FAEDEC" : "#E8F1F9";

  const textColor =
    type === "success" ? "#2E7D32" : type === "error" ? "#C62828" : "#1565C0";

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity,
          backgroundColor,
          transform: [{ translateY }],
        },
      ]}
    >
      <Text style={[styles.text, { color: textColor }]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    width: "auto",
    maxWidth: "85%",
    padding: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 1000,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default Toast;
