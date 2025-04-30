import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <Link href={`/tasks/${task.id}`} asChild>
      <TouchableOpacity style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{task.title}</Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: task.status === 'completed' ? '#4CAF50' : '#FFC107' }
          ]}>
            <Text style={styles.statusText}>
              {task.status === 'completed' ? 'Completada' : 'Pendiente'}
            </Text>
          </View>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {task.description}
        </Text>
        {task.dueDate && (
          <Text style={styles.dueDate}>
            Vence: {new Date(task.dueDate).toLocaleDateString()}
          </Text>
        )}
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  description: {
    color: '#666',
    marginBottom: 10,
  },
  dueDate: {
    color: '#999',
    fontSize: 12,
  },
}); 