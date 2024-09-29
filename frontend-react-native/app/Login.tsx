import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Firebase email/password authentication
      await firebase.auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Login Successful');
      // Navigate to home screen or dashboard after successful login
      navigation.replace('HomeScreen');
    } catch (error) {
      console.error(error);
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <Button title="Login" onPress={handleLogin} />

      <Text style={styles.signupText}>
        Don't have an account?
        <Text style={styles.signupLink} onPress={() => navigation.navigate('SignUpScreen')}>
          Sign up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  signupText: {
    marginTop: 20,
    textAlign: 'center',
  },
  signupLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
