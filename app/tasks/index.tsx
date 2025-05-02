import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import ArrowIcon from "@/assets/arrow.svg";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { format } from "date-fns";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import FormInput from "@/components/FormInput";
import { useTasksScreen } from "./useTasksScreen";

export default function Tasks() {
  const {
    user,
    activeFilter,
    handleLogout,
    handleFilterChange,
    filters,
    tasks,
    isPickerVisible,
    showPicker,
    hidePicker,
    handleConfirm,
    currentDate,
  } = useTasksScreen();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.safeArea}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>{user?.name}'s Tasks</Text>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <View style={styles.logoutIcon}>
                  <ArrowIcon width={15} />
                </View>
                <Text style={styles.logoutText}>Log out</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.date}>{currentDate}</Text>

            <View style={styles.inputsContainer}>
              <FormInput placeholder="Search by Title or Name" />
              <View style={styles.dateInputsContainer}>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => showPicker("start")}
                >
                  <Text style={styles.placeholder}>
                    {filters.startDate
                      ? format(filters.startDate, "yyyy-MM-dd")
                      : "start date"}
                  </Text>
                  <Ionicons name="calendar-outline" size={18} color="#999" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.input}
                  onPress={() => showPicker("end")}
                >
                  <Text style={styles.placeholder}>
                    {filters.endDate
                      ? format(filters.endDate, "yyyy-MM-dd")
                      : "end date"}
                  </Text>
                  <Ionicons name="calendar-outline" size={18} color="#999" />
                </TouchableOpacity>

                <DateTimePickerModal
                  isVisible={isPickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hidePicker}
                />
              </View>
            </View>

            <View style={styles.emptyStateContainer}>
              <View style={styles.tabsContainer}>
                <TouchableOpacity
                  onPress={() => handleFilterChange("all")}
                  style={[styles.tabButton]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeFilter === "all" && styles.activeTabText,
                    ]}
                  >
                    All tasks
                  </Text>
                </TouchableOpacity>
                <Feather
                  name="minus"
                  size={24}
                  color="rgba(204, 207, 210, 1)"
                  style={styles.tabSeparator}
                />
                <TouchableOpacity
                  onPress={() => handleFilterChange("completed")}
                  style={[styles.tabButton]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeFilter === "completed" && styles.activeTabText,
                    ]}
                  >
                    Completed tasks
                  </Text>
                </TouchableOpacity>
              </View>

              {tasks.length === 0 && (
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
              )}
            </View>
          </View>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>Create a Task</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
