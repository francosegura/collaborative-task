import { StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      padding: 20,
    },
    logoContainer: {
      alignItems: 'center',
      marginTop: 60,
      marginBottom: 32,
    },
    logo: {
      width: 80,
      height: 80,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 24,
      lineHeight: 32,
      marginBottom: 48,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    titleBold: {
      fontWeight: 'regular',
      fontStyle: 'italic',
    },
    form: {
      gap: 20,
    },
    forgotPassword: {
      alignSelf: 'flex-end',
      marginTop: 8,
    },
    forgotPasswordText: {
      color: colors.text.primary,
      fontSize: 14,
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
    },
    signupContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 16,
    },
    signupText: {
      color: colors.text.primary,
      fontSize: 14,
    },
    signupLink: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: '600',
    },
  }); 