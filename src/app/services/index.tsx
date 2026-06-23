import React from 'react';
import { FlatList, View, StyleSheet, Alert } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Screen, Button, EmptyState, LoadingState, SectionHeader } from '../../components/ui';
import { ServiceCard } from '../../features/services/components/ServiceCard';
import { useServiceStore } from '../../store/serviceStore';
import { useVehicleStore } from '../../store/vehicleStore';
import { spacing } from '../../theme';

export default function ServicesScreen() {
  const { records, totalMaintenanceCost, loadRecords, isLoading, deleteRecord } = useServiceStore();
  const currentVehicle = useVehicleStore((state) => state.getCurrentVehicle());

  useFocusEffect(
    React.useCallback(() => {
      if (currentVehicle?.id) {
        loadRecords(currentVehicle.id);
      }
    }, [currentVehicle?.id])
  );

  const handleDelete = (id: string) => {
    Alert.alert('Delete Service Record', 'Are you sure you want to delete this record?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => {
        if (currentVehicle) deleteRecord(id, currentVehicle.id);
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

  if (isLoading && records.length === 0) {
    return <LoadingState message="Loading service records..." />;
  }

  return (
    <Screen>
      <View style={styles.container}>
        <SectionHeader 
          title={`Service History (Total: ₹${totalMaintenanceCost.toFixed(2)})`}
          actionTitle="+ Add New" 
          onActionPress={() => router.push('/services/add')}
        />
        
        <FlatList
          data={records}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: spacing.xxl }}
          renderItem={({ item }) => (
            <View>
              <ServiceCard record={item} />
              <View style={styles.actions}>
                <Button title="Edit" variant="outline" style={styles.actionBtn} onPress={() => router.push(`/services/edit?id=${item.id}`)} />
                <Button title="Delete" variant="danger" style={styles.actionBtn} onPress={() => handleDelete(item.id)} />
              </View>
            </View>
          )}
          ListEmptyComponent={
            <EmptyState title="No Service Records" description="Start tracking your maintenance history." />
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
