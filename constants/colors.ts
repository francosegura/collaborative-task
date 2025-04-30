export const colors = {
  // Colores principales
  primary: '#0A82FF',
  white: '#FFFFFF',
  
  // Texto
  text: {
    primary: '#1C1C1E',
    secondary: '#666666',
    tertiary: '#999999',
  },

  // Estados
  status: {
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#FF3B30',
  },

  // Bordes e inputs
  border: '#E5E5EA',
  
  // Fondos
  background: {
    secondary: '#F2F2F7',
  },
} as const;

// Tipo para ayudar con el autocompletado
export type AppColors = typeof colors; 