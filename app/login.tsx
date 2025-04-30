import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { colors } from '../constants/colors';
import FormInput from '../components/FormInput';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
    };

    // Validar email
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Validar password
    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        await login(email, password);
        router.replace('/tasks');
      } catch (error) {
        console.error('Login error:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/icon.png")} style={styles.logo} />
      </View>

      <Text style={styles.title}>
        Your tasks collaboration{"\n"}
        starts with <Text style={styles.titleBold}>Collaby</Text>.
      </Text>

      <View style={styles.form}>
        <FormInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Your email"
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        <FormInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Your password"
          isPassword
          error={errors.password}
        />
      </View>

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Create an account? </Text>
        <Link href="/register" asChild>
          <TouchableOpacity>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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