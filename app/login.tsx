import { View, Text, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { colors } from '../constants/colors';
import FormInput from '../components/FormInput';
import { Formik } from 'formik';
import { loginSchema } from '../utils/validationSchemas';

export default function Login() {
  const { login } = useAuth();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await login(values.email, values.password);
      router.replace('/tasks');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Image source={require("../assets/icon.png")} style={styles.logo} />
        </View>

        <Text style={styles.title}>
          Your tasks collaboration starts with <Text style={styles.titleBold}>Collaby</Text>.
        </Text>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.form}>
              <FormInput
                label="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder="Your email"
                keyboardType="email-address"
                autoCapitalize="none"
                error={touched.email ? errors.email : ''}
              />

              <FormInput
                label="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                placeholder="Your password"
                isPassword
                error={touched.password ? errors.password : ''}
              />

              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
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
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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