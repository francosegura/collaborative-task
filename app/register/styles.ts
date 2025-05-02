import { StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

export const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      padding: 20,
    },
    header: {
      gap: 16,
      flexDirection: 'row',
    },
    title: {
      fontSize: 28,
      lineHeight: 34,
      marginBottom: 32,
      fontWeight: 'bold',
    },
    titleItalic: {
      fontStyle: 'italic',
      fontWeight: 'normal',
    },
    form: {
      gap: 20,
    },
    button: {
      backgroundColor: colors.primary,
      height: 52,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 32,
    },
    buttonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '600',
    },
  }); 