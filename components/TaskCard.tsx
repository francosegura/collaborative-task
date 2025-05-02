import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { format } from 'date-fns';
import { Task } from '@/types/task';

type Props = {
  task: Task;
  onToggleComplete?: () => void;
};

const TaskCard = ({ task, onToggleComplete }: Props) => {
  const initials = task.user
    .split(' ')
    .map((s) => s[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const dueDate = task.dueDate ? format(task.dueDate, 'MMMM dd, yyyy') : null;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.description}>{task.description}</Text>
        </View>
        <TouchableOpacity onPress={onToggleComplete}>
          <View style={styles.checkbox}>
            {task.completed && <Ionicons name="checkmark" size={18} color="#000" />}
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        {dueDate && (
          <View style={styles.dateBox}>
            <Text style={styles.dateText}>{dueDate}</Text>
            <Ionicons name="alert-circle" size={14} color="#dc2626" />
          </View>
        )}

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    color: '#6B7280',
    fontSize: 14,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FECACA',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 6,
  },
  dateText: {
    color: '#dc2626',
    fontWeight: '500',
    fontSize: 13,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default TaskCard;
