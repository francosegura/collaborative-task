import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TextInputProps } from 'react-native';
import { colors } from '../constants/colors';
import EyeIcon from '../assets/eye.svg';

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  isPassword?: boolean;
  onChangeText?: (text: string) => void;
  onErrorChange?: (hasError: boolean) => void;
}

export default function FormInput({ 
  label, 
  error,
  isPassword,
  onChangeText,
  onErrorChange,
  ...props 
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState(error);

  useEffect(() => {
    setLocalError(error);
  }, [error]);

  const handleChangeText = (text: string) => {
    if (localError) {
      setLocalError('');
      onErrorChange?.(false);
    }
    onChangeText?.(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            localError ? styles.inputError : null,
            isPassword ? styles.passwordInput : null,
          ]}
          secureTextEntry={isPassword && !showPassword}
          placeholderTextColor="#A1A1A6"
          onChangeText={handleChangeText}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <EyeIcon
              width={20}
              height={20}
              stroke={colors.text.primary}
              strokeWidth={1.5}
              opacity={showPassword ? 1 : 0.4}
            />
          </TouchableOpacity>
        )}
      </View>
      {localError && <Text style={styles.errorText}>{localError}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: '500',
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    height: 52,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text.primary,
    backgroundColor: colors.white,
  },
  inputError: {
    borderColor: colors.status.error,
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
    height: 20,
    width: 20,
  },
  errorText: {
    color: colors.status.error,
    fontSize: 14,
    marginTop: 4,
  },
}); 