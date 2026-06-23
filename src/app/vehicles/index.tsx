import React, { useEffect } from 'react';
import { FlatList, View, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { Screen, Button, EmptyState, LoadingState, SectionHeader } from '../../components/ui';
import { VehicleCard } from '../../features/vehicles/components/VehicleCard';
import { useVehicleStore } from '../../store/vehicleStore';
import { spacing } from '../../theme';

export default function VehiclesScreen() {
  const { vehicles, loadVehicles, isLoading, deleteVehicle } = useVehicleStore();

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleDelete = (id: string, name: string) => {
    Alert.alert('Delete Vehicle', `Are you sure you want to delete ${name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteVehicle(id) }
    ]);
  };

  if (isLoading && vehicles.length === 0) {
    return <LoadingState message="Loading vehicles..." />;
  }

  return (
    <Screen>
      <View style={styles.container}>
        <SectionHeader 
          title="My Vehicles" 
          actionTitle="+ Add New" 
          onActionPress={() => router.push('/vehicles/add')}
        />
        
        <FlatList
          data={vehicles}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: spacing.xxl }}
          renderItem={({ item }) => (
            <View>
              <VehicleCard vehicle={item} />
              <View style={styles.actions}>
                <Button 
                  title="Edit" 
                  variant="outline" 
                  style={styles.actionBtn} 
                  onPress={() => router.push(`/vehicles/edit?id=${item.id}`)}
                />
                <Button 
                  title="Delete" 
                  variant="danger" 
                  style={styles.actionBtn} 
                  onPress={() => handleDelete(item.id, item.name)}
                />
              </View>
            </View>
          )}
          ListEmptyComponent={
            <EmptyState 
              title="No Vehicles Yet" 
              description="Add your first vehicle to start tracking expenses and maintenance." 
            />
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
