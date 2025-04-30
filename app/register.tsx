import { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  ScrollView,
  Platform,
  SafeAreaView
} from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { colors } from '../constants/colors';
import FormInput from '../components/FormInput';
import { Ionicons } from '@expo/vector-icons';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { register } = useAuth();

  const validateForm = () => {
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (!firstName) {
      newErrors.firstName = 'Firstname is required';
    }

    if (!lastName) {
      newErrors.lastName = 'Lastname is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Password and confirm password must match';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleRegister = async () => {
    if (validateForm()) {
      try {
        await register(email, password, `${firstName} ${lastName}`);
        router.replace('/tasks');
      } catch (error) {
        console.error('Register error:', error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={colors.text.primary}
                />
              </TouchableOpacity>
            </Link>

            <Text style={styles.title}>
              Just a few steps away to
              <Text style={styles.titleItalic}> complete your tasks</Text>.
            </Text>
          </View>

          <View style={styles.form}>
            <FormInput
              label="Firstname"
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Your firstname"
              error={errors.firstName}
              onErrorChange={(hasError) => {
                if (!hasError)
                  setErrors((prev) => ({ ...prev, firstName: "" }));
              }}
            />

            <FormInput
              label="Lastname"
              value={lastName}
              onChangeText={setLastName}
              placeholder="Your lastname"
              error={errors.lastName}
              onErrorChange={(hasError) => {
                if (!hasError) setErrors((prev) => ({ ...prev, lastName: "" }));
              }}
            />

            <FormInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Your email"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              onErrorChange={(hasError) => {
                if (!hasError) setErrors((prev) => ({ ...prev, email: "" }));
              }}
            />

            <FormInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Your password"
              isPassword
              error={errors.password}
              onErrorChange={(hasError) => {
                if (!hasError) setErrors((prev) => ({ ...prev, password: "" }));
              }}
            />

            <FormInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Your password"
              isPassword
              error={errors.confirmPassword}
              onErrorChange={(hasError) => {
                if (!hasError)
                  setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Create account</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
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