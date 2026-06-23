import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { Screen, SectionHeader } from '../../components/ui';
import { ReminderForm } from '../../features/reminders/components/ReminderForm';
import { useReminderStore } from '../../store/reminderStore';
import { useVehicleStore } from '../../store/vehicleStore';
import { spacing } from '../../theme';

export default function AddReminderScreen() {
  const addReminder = useReminderStore((state) => state.addReminder);
  const currentVehicle = useVehicleStore((state) => state.getCurrentVehicle());
  const [isSaving, setIsSaving] = useState(false);

  if (!currentVehicle) {
    return (
      <Screen>
        <View style={{ padding: spacing.md }}>
          <Text>No vehicle selected.</Text>
        </View>
      </Screen>
    );
  }

  const handleSubmit = async (data: any) => {
    setIsSaving(true);
    await addReminder({
      id: Math.random().toString(36).substring(2, 11),
      ...data
    });
    setIsSaving(false);
    router.back();
  };

  return (
    <Screen>
      <View style={{ padding: spacing.md, flex: 1 }}>
        <SectionHeader title="Add Reminder" />
        <ReminderForm vehicleId={currentVehicle.id} onSubmit={handleSubmit} isLoading={isSaving} />
      </View>
    </Screen>
  );
}
