import { colors } from '@/constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
  