import React, { useEffect } from 'react';
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
import { Formik } from 'formik';
import { taskSchema } from '@/utils/validationSchemas';
import { TaskFormData } from '@/types/task';
import { Task } from '@/types/task';
interface CreateTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
  initialValues?: Task | null;
  editMode?: boolean;
}

export const CreateTaskModal = ({ visible, onClose, onSubmit, initialValues, editMode }: CreateTaskModalProps) => {
  return (
    <Modal isVisible={visible} onBackdropPress={onClose} useNativeDriver>
      <Formik
        initialValues={
            initialValues ? {
              title: initialValues.title,
              description: initialValues.description,
              startDate: initialValues.startDate,
              dueDate: initialValues.dueDate,
              assignedTo: initialValues.user,
              completed: initialValues.completed,
            } : {
            title: '',
            description: '',
            startDate: null,
            dueDate: null,
            assignedTo: '',
            completed: false,
          } as TaskFormData
        }
        validationSchema={taskSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm();
          onClose();
        }}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const [pickerType, setPickerType] = React.useState<'start' | 'end' | null>(null);
          const [isPickerVisible, setPickerVisible] = React.useState(false);

          const showPicker = (type: 'start' | 'end') => {
            setPickerType(type);
            setPickerVisible(true);
          };
          const hidePicker = () => {
            if (pickerType === "start") setFieldValue("startDate", null);
            if (pickerType === "end") setFieldValue("dueDate", null);
            setPickerVisible(false);
          };

          const handleConfirm = (date: Date) => {
            if (pickerType === "start") setFieldValue("startDate", date, true);
            if (pickerType === "end") setFieldValue("dueDate", date, true);
            setPickerVisible(false);
          };

          useEffect(() => {
            if (!visible) {
              setPickerType(null);
              setPickerVisible(false);
            }
          }, [visible]);

          return (
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
                <FormInput
                  placeholder="Title for your task"
                  value={values.title}
                  onChangeText={handleChange("title")}
                  onBlur={handleBlur("title")}
                  style={styles.input}
                  error={typeof errors.title === 'string' && touched.title ? errors.title : undefined}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Description</Text>
                <FormInput
                  placeholder="Enter a description for your task"
                  value={values.description}
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  multiline
                  numberOfLines={4}
                  style={styles.textArea}
                  error={typeof errors.description === 'string' && touched.description ? errors.description : undefined}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Start date</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => showPicker("start")}
                >
                  <Text style={styles.placeholder}>
                    {values.startDate
                      ? format(values.startDate, "MM-dd-yyyy")
                      : "Start Date"}
                  </Text>
                  <Ionicons name="chevron-down" size={20} />
                </TouchableOpacity>
                {touched.startDate && typeof errors.startDate === 'string' && (
                  <Text style={styles.error}>{errors.startDate}</Text>
                )}
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>End date</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => showPicker("end")}
                >
                  <Text style={styles.placeholder}>
                    {values.dueDate
                      ? format(values.dueDate, "MM-dd-yyyy")
                      : "End Date"}
                  </Text>
                  <Ionicons name="chevron-down" size={20} />
                </TouchableOpacity>
                {touched.dueDate && typeof errors.dueDate === 'string' && (
                  <Text style={styles.error}>{errors.dueDate}</Text>
                )}
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
                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    values.completed && styles.checkboxChecked,
                  ]}
                  onPress={() => setFieldValue("completed", !values.completed)}
                >
                  {values.completed && (
                    <Ionicons
                      name="checkmark"
                      size={18}
                      color={colors.primary}
                    />
                  )}
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.createButton,
                  (!values.title ||
                    !values.startDate ||
                    !!errors.dueDate ||
                    !!errors.startDate ||
                    !!errors.title) && { backgroundColor: "#e3e9f6" },
                ]}
                onPress={() => handleSubmit()}
                disabled={
                  !values.title ||
                  !values.startDate ||
                  !!errors.dueDate ||
                  !!errors.startDate ||
                  !!errors.title
                }
              >
                <Text
                  style={[
                    styles.createButtonText,
                    (!values.title ||
                      !values.startDate ||
                      !!errors.dueDate ||
                      !!errors.startDate ||
                      !!errors.title) && { color: "#b0b8c9" },
                  ]}
                >
                  {editMode ? 'Update task' : 'Create task'}
                </Text>
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isPickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hidePicker}
              />
            </ScrollView>
          );
        }}
      </Formik>
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    borderColor: colors.primary,
    backgroundColor: '#e3e9f6',
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
  error: {
    color: '#e74c3c',
    fontSize: 13,
    marginTop: 4,
    marginLeft: 4,
  },
}); 