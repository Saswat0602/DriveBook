import React, { useEffect } from 'react';
import { FlatList, View, StyleSheet, Alert } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Screen, Button, EmptyState, LoadingState, SectionHeader } from '../../components/ui';
import { ReminderCard } from '../../features/reminders/components/ReminderCard';
import { useReminderStore } from '../../store/reminderStore';
import { useVehicleStore } from '../../store/vehicleStore';
import { spacing } from '../../theme';

export default function RemindersScreen() {
  const { reminders, loadReminders, isLoading, deleteReminder } = useReminderStore();
  const currentVehicle = useVehicleStore((state) => state.getCurrentVehicle());

  useFocusEffect(
    React.useCallback(() => {
      if (currentVehicle?.id) {
        loadReminders(currentVehicle.id);
      }
    }, [currentVehicle?.id])
  );

  const handleDelete = (id: string) => {
    Alert.alert('Delete Reminder', 'Are you sure you want to delete this reminder?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => {
        if (currentVehicle) deleteReminder(id, currentVehicle.id);
      }}
    ]);
  };

  if (!currentVehicle) {
    return (
      <Screen>
        <EmptyState title="No Vehicle Selected" description="Please select or add a vehicle first." />
      </Screen>
    );
  }

  if (isLoading && reminders.length === 0) {
    return <LoadingState message="Loading reminders..." />;
  }

  return (
    <Screen>
      <View style={styles.container}>
        <SectionHeader 
          title="Upcoming Reminders"
          actionTitle="+ Add New" 
          onActionPress={() => router.push('/reminders/add')}
        />
        
        <FlatList
          data={reminders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: spacing.xxl }}
          renderItem={({ item }) => (
            <View>
              <ReminderCard reminder={item} />
              <View style={styles.actions}>
                <Button title="Edit" variant="outline" style={styles.actionBtn} onPress={() => router.push(`/reminders/edit?id=${item.id}`)} />
                <Button title="Delete" variant="danger" style={styles.actionBtn} onPress={() => handleDelete(item.id)} />
              </View>
            </View>
          )}
          ListEmptyComponent={
            <EmptyState title="No Reminders" description="Set up notifications for upcoming service or insurance." />
          }
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  actionBtn: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  }
});
