import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Define all screens here */}
      <Stack.Screen name="index" options={{ title: 'Login' }} />
      <Stack.Screen name="signup" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="home" options={{ title: 'Home' }} />
    </Stack>
  );
}
