import { Slot } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { TaskProvider } from '../context/TaskContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Slot />
      </TaskProvider>
    </AuthProvider>
  );
}
