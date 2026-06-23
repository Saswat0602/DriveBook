import React, { useEffect } from 'react';
import { FlatList, View, StyleSheet, Alert } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Screen, Button, EmptyState, LoadingState, SectionHeader } from '../../components/ui';
import { FuelCard } from '../../features/fuel/components/FuelCard';
import { useFuelStore } from '../../store/fuelStore';
import { useVehicleStore } from '../../store/vehicleStore';
import { spacing } from '../../theme';
import { MileageCalculatorService } from '../../services/MileageCalculatorService';

export default function FuelScreen() {
  const { logs, averageMileage, loadLogs, isLoading, deleteLog } = useFuelStore();
  const currentVehicle = useVehicleStore((state) => state.getCurrentVehicle());

  useFocusEffect(
    React.useCallback(() => {
      if (currentVehicle?.id) {
        loadLogs(currentVehicle.id);
      }
    }, [currentVehicle?.id])
  );

  const handleDelete = (id: string) => {
    Alert.alert('Delete Fuel Log', 'Are you sure you want to delete this log?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => {
        if (currentVehicle) deleteLog(id, currentVehicle.id);
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

  if (isLoading && logs.length === 0) {
    return <LoadingState message="Loading fuel logs..." />;
  }

  return (
    <Screen>
      <View style={styles.container}>
        <SectionHeader 
          title={`Fuel Logs (Avg: ${averageMileage.toFixed(1)} km/l)`}
          actionTitle="+ Add New" 
          onActionPress={() => router.push('/fuel/add')}
        />
        
        <FlatList
          data={logs}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: spacing.xxl }}
          renderItem={({ item, index }) => {
            // Calculate mileage with previous log (which is at index + 1 since sorted descending)
            const prevLog = index + 1 < logs.length ? logs[index + 1] : undefined;
            const mileage = MileageCalculatorService.calculateMileage(item, prevLog);
            
            return (
              <View>
                <FuelCard log={item} mileage={mileage} />
                <View style={styles.actions}>
                  <Button title="Edit" variant="outline" style={styles.actionBtn} onPress={() => router.push(`/fuel/edit?id=${item.id}`)} />
                  <Button title="Delete" variant="danger" style={styles.actionBtn} onPress={() => handleDelete(item.id)} />
                </View>
              </View>
            );
          }}
          ListEmptyComponent={
            <EmptyState title="No Fuel Logs" description="Start tracking your fuel fill-ups." />
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
