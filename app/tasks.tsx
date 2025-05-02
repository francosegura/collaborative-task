import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { colors } from '../constants/colors';
import { router } from 'expo-router';
import ArrowIcon from '../assets/arrow.svg';
import FormInput from '../components/FormInput';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { format } from 'date-fns';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Ionicons } from '@expo/vector-icons';

type FilterType = 'all' | 'completed';

export default function Tasks() {
  const { user, logout } = useAuth();
  const { tasks, filters, setFilters } = useTasks();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [pickerType, setPickerType] = useState<'start' | 'end' | null>(null);
  const [isPickerVisible, setPickerVisible] = useState(false);

  const showPicker = (type: 'start' | 'end') => {
    setPickerType(type);
    setPickerVisible(true);
  };

  const hidePicker = () => {
    setPickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    if (pickerType === 'start') setFilters({ ...filters, startDate: date });
    if (pickerType === 'end') setFilters({ ...filters, endDate: date });
    hidePicker();
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  // Get current date in format "Wednesday, April 30"
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: '2-digit'
  });

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
                <TouchableOpacity style={styles.input} onPress={() => showPicker('start')}>
                  <Text style={styles.placeholder}>
                    {filters.startDate ? format(filters.startDate, 'yyyy-MM-dd') : 'start date'}
                  </Text>
                  <Ionicons name="calendar-outline" size={18} color="#999" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.input} onPress={() => showPicker('end')}>
                  <Text style={styles.placeholder}>
                    {filters.endDate ? format(filters.endDate, 'yyyy-MM-dd') : 'end date'}
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    width: "50%",
  },
  emptyIcon: {
    marginBottom: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(199, 202, 205, 0.4)",
    gap: 4,
    backgroundColor: colors.white,
  }, 
  inputsContainer: {
    gap: 8,
  },
  tabSeparator: {
    transform: [{ rotate: '90deg' }],
  },
  logoutText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },
  date: {
    fontSize: 16,
    color: "#A3A3A3",
    marginBottom: 24,
  },
  dateInputsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  placeholder: {
    color: '#888',
    fontSize: 14,
  },
  tabsContainer: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  tabText: {
    color: "#A3A3A3",
    fontSize: 14,
    fontWeight: "bold",
  },
  activeTabText: {
    color: colors.primary,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 32,
  },
  emptyStateTitle: {
    fontSize: 20,
    color: colors.text.secondary,
    textAlign: "center",
    fontWeight: "bold",
  },
  emptyStateSubtitle: {
    marginTop: 6,
    fontSize: 20,
    color: colors.text.secondary,
    textAlign: "center",
  },
  bottomContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginBottom: 32,
  },
  createButton: {
    backgroundColor: "rgba(10, 130, 255, 0.14)",
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  createButtonText: {
    color: colors.primary,
    fontSize: 16,
  },
  logoutIcon: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 3,
    height: 12,
    width: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
