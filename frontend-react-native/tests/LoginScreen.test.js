import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../app/Login';
import firebase from '../__mocks__/@react-native-firebase/auth'; // Mocked firebase
import navigation from '../__mocks__/navigation';     // Mocked navigation

jest.mock('@react-native-firebase/auth');          // Mock Firebase auth
jest.mock('react-navigation');                     // Mock React Navigation

describe('LoginScreen', () => {
  it('renders correctly', () => {
    const { getByRole, getByPlaceholderText } = render(<LoginScreen navigation={navigation} />);

    // Use 'button' role to target the button element
    const loginButton = getByRole('button', { name: 'Login' });

    expect(loginButton).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  it('displays error when email or password is incorrect', async () => {
    const { getByRole, getByPlaceholderText } = render(<LoginScreen navigation={navigation} />);

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    // Use 'button' role to target the button element
    const loginButton = getByRole('button', { name: 'Login' });

    fireEvent.changeText(emailInput, 'wrong@example.com');
    fireEvent.changeText(passwordInput, 'wrongpassword');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(firebase.auth().signInWithEmailAndPassword).toHaveBeenCalledWith('wrong@example.com', 'wrongpassword');
      expect(getByText('Login Failed')).toBeTruthy();
    });
  });

  it('navigates to HomeScreen on successful login', async () => {
    const { getByRole, getByPlaceholderText } = render(<LoginScreen navigation={navigation} />);

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    // Use 'button' role to target the button element
    const loginButton = getByRole('button', { name: 'Login' });

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(firebase.auth().signInWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(navigation.replace).toHaveBeenCalledWith('HomeScreen');
    });
  });
});
