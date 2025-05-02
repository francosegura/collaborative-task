import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { colors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import FormInput from '@/components/FormInput';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from 'date-fns';

interface CreateTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    startDate: Date | null;
    endDate: Date | null;
    assignedTo: string | null;
    completed: boolean;
  }) => void;
}

export const CreateTaskModal = ({ visible, onClose, onSubmit }: CreateTaskModalProps) => {
    const [pickerType, setPickerType] = useState<'start' | 'end' | null>(null);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
    const showPicker = (type: "start" | "end") => {
      setPickerType(type);
      setPickerVisible(true);
    };
    const hidePicker = () => {
        setPickerVisible(false);
      };
    
      const handleConfirm = (date: Date) => {
        if (pickerType === "start") setStartDate(date);
        if (pickerType === "end") setEndDate(date);
        hidePicker();   
      };
      const handleCreateTask = () => {
        onSubmit({
          title: "",
          description: "",
          startDate: startDate,
          endDate: endDate,
          assignedTo: null,
          completed: false,
        });
        onClose();
      };
  return (
    <Modal isVisible={visible} onBackdropPress={onClose} useNativeDriver>
      <ScrollView
        style={styles.modalContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Add new Task</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Title</Text>
          <FormInput placeholder="Title for your task" />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <FormInput
            placeholder="Enter an description for you task"
            multiline
            numberOfLines={4}
            style={styles.textArea}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Start date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => showPicker("start")}
          >
            <Text style={styles.placeholder}>
              {startDate ? format(startDate, "MM-dd-yyyy") : "Start Date"}
            </Text>
            <Ionicons name="chevron-down" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>End date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => showPicker("end")}
          >
            <Text style={styles.placeholder}>
              {endDate ? format(endDate, "MM-dd-yyyy") : "End Date"}
            </Text>
            <Ionicons name="chevron-down" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Assign to</Text>
          <TouchableOpacity style={styles.dateInput}>
            <Text style={styles.dateInputText}>
              Select and user for your task
            </Text>
            <Ionicons name="chevron-down" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.completedContainer}>
          <Text style={styles.label}>Task Completed</Text>
          <TouchableOpacity style={styles.checkbox} />
        </View>

        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateTask}
        >
          <Text style={styles.createButtonText}>Create task</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isPickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hidePicker}
        />
      </ScrollView>
    </Modal>
  );
};

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 60,
    maxHeight: SCREEN_HEIGHT * 0.9,
    width: SCREEN_WIDTH,
    position: "absolute",
    bottom: -20,
    left: -20,
  },
  placeholder: {
    color: "#888",
    fontSize: 14,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  closeButton: {
    padding: 5,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
    fontWeight: "500",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
    padding: 16,
  },
  input: {
    flex: 1,
    height: 45,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 12,
    padding: 16,
  },
  dateInputText: {
    fontSize: 16,
    color: "#999",
  },
  completedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 4,
  },
  createButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  createButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
}); 