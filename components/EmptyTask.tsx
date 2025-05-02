import React from "react";
import { Text, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

export const EmptyTask = () => {
  return (
    <>
      <FontAwesome6
        name="list-ul"
        size={80}
        color="rgba(199, 202, 205, 0.36)"
        style={styles.emptyIcon}
      />
      <Text style={styles.emptyStateTitle}>
        <Text style={{ fontStyle: "italic" }}>Just Press</Text>{" "}
        "Create a Task"
      </Text>
      <Text style={styles.emptyStateSubtitle}>
        and start collaborating
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  emptyIcon: {
    marginBottom: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
}); 