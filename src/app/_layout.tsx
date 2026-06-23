import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { initDatabase } from '../database';
import { LoadingState, Screen } from '../components/ui';

export default function RootLayout() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    const setup = async () => {
      try {
        await initDatabase();
        setDbInitialized(true);
      } catch (e) {
        console.error("Database init error:", e);
      }
    };
    setup();
  }, []);

  if (!dbInitialized) {
    return (
      <Screen>
        <LoadingState message="Initializing Database..." />
      </Screen>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="vehicles/index" />
      <Stack.Screen name="vehicles/add" options={{ presentation: 'modal' }} />
      <Stack.Screen name="vehicles/edit" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
