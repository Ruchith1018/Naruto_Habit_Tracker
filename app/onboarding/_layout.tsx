import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="name" />
      <Stack.Screen name="avatar" />
      <Stack.Screen name="age" />
      <Stack.Screen name="village" />
      <Stack.Screen name="tutorial" />
    </Stack>
  );
}