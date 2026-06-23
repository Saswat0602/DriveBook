import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Screen, SectionHeader } from '../../components/ui';
import { ReminderForm } from '../../features/reminders/components/ReminderForm';
import { useReminderStore } from '../../store/reminderStore';
import { spacing } from '../../theme';

export default function EditReminderScreen() {
  const { id } = useLocalSearchParams();
  const { reminders, updateReminder } = useReminderStore();
  const [isSaving, setIsSaving] = useState(false);

  const reminder = reminders.find(r => r.id === id);

  if (!reminder) {
    return (
      <Screen>
        <View style={{ padding: spacing.md }}>
          <Text>Reminder not found</Text>
        </View>
      </Screen>
    );
  }

  const handleSubmit = async (data: any) => {
    setIsSaving(true);
    await updateReminder({
      id: reminder.id,
      ...data
    });
    setIsSaving(false);
    router.back();
  };

  return (
    <Screen>
      <View style={{ padding: spacing.md, flex: 1 }}>
        <SectionHeader title="Edit Reminder" />
        <ReminderForm vehicleId={reminder.vehicleId} initialValues={reminder} onSubmit={handleSubmit} isLoading={isSaving} />
      </View>
    </Screen>
  );
}
