import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, SafeAreaView } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { colors } from '../constants/colors';
import FormInput from '../components/FormInput';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { registerSchema } from '../utils/validationSchemas';

export default function Register() {
  const { register } = useAuth();

  const handleSubmit = async (values: { 
    firstName: string; 
    lastName: string; 
    email: string; 
    password: string; 
    confirmPassword: string;
  }) => {
    try {
      await register(values.email, values.password, `${values.firstName} ${values.lastName}`);
      router.replace('/tasks');
    } catch (error) {
      console.error('Register error:', error);
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

          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.form}>
                <FormInput
                  label="Firstname"
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  placeholder="Your firstname"
                  error={touched.firstName ? errors.firstName : ''}
                />

                <FormInput
                  label="Lastname"
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  placeholder="Your lastname"
                  error={touched.lastName ? errors.lastName : ''}
                />

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

                <FormInput
                  label="Confirm Password"
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  placeholder="Your password"
                  isPassword
                  error={touched.confirmPassword ? errors.confirmPassword : ''}
                />

                <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                  <Text style={styles.buttonText}>Create account</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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