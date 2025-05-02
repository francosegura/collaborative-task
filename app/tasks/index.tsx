import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import ArrowIcon from "@/assets/arrow.svg";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { format } from "date-fns";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import FormInput from "@/components/FormInput";
import { useTasksScreen } from "./useTasksScreen";
import {CreateTaskModal} from "./CreateTaskModal";
import TaskCard from '@/components/TaskCard';
import { Task, TaskFormData } from "@/types/task";
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
    isCreateModalVisible,
    handleCreateTaskPress,
    handleCloseModal,
    handleCreateTask,
  } = useTasksScreen();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleLongPressTask = (task: Task) => {
    setSelectedTask(task);
    setEditMode(true);
    handleCreateTaskPress();
  };

  const handleCloseModalWithReset = () => {
    setSelectedTask(null);
    setEditMode(false);
    handleCloseModal();
  };

  const handleSubmitTask = (task: TaskFormData) => {
    handleCreateTask(task, editMode, selectedTask?.id);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.safeArea}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.scrollContent}>
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
                      ? format(filters.startDate, "MM-dd-yyyy")
                      : "start date"}
                  </Text>
                  <Ionicons name="calendar-outline" size={18} color="#999" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.input}
                  onPress={() => showPicker("end")}
                >
                  <Text style={styles.placeholder}>
                    {filters.dueDate
                      ? format(filters.dueDate, "MM-dd-yyyy")
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
              </View>
              <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TaskCard
                    task={item}
                    onLongPress={() => handleLongPressTask(item)}
                  />
                )}
                contentContainerStyle={{ paddingBottom: 24 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={
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
                }
              />
            
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => {
              setSelectedTask(null);
              setEditMode(false);
              handleCreateTaskPress();
            }}
          >
            <Text style={styles.createButtonText}>Create a Task</Text>
          </TouchableOpacity>
        </View>
        <CreateTaskModal
          visible={isCreateModalVisible}
          onClose={handleCloseModalWithReset}
          onSubmit={handleSubmitTask}
          initialValues={selectedTask}
          editMode={editMode}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
