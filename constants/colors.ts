export const colors = {
  primary: '#0A82FF',
  white: '#FFFFFF',
  text: {
    primary: '#1C1C1E',
    secondary: '#A3A3A3',
    tertiary: '#999999',
  },
  status: {
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#FF3B30',
  },
  border: '#E5E5EA',
  background: {
    secondary: '#F2F2F7',
  },
} as const;

export type AppColors = typeof colors; 