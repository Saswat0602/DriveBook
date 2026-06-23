import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Alert, ScrollView, TouchableOpacity, Text } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Screen, Button, EmptyState, LoadingState, SectionHeader } from '../../components/ui';
import { ServiceCard } from '../../features/services/components/ServiceCard';
import { useServiceStore } from '../../store/serviceStore';
import { useVehicleStore } from '../../store/vehicleStore';
import { spacing, radius, typography } from '../../theme';
import { useTheme } from '../../hooks/useTheme';

export default function ServicesScreen() {
  const { colors } = useTheme();
  const { records, loadRecords, isLoading, deleteRecord } = useServiceStore();
  const currentVehicle = useVehicleStore((state) => state.getCurrentVehicle());

  const [selectedType, setSelectedType] = useState<string | null>(null);

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

  const availableTypes = Array.from(new Set(records.map(r => r.serviceType))).sort();
  const filteredRecords = selectedType ? records.filter(r => r.serviceType === selectedType) : records;
  const filteredCost = filteredRecords.reduce((acc, curr) => acc + curr.cost, 0);

  return (
    <Screen>
      <View style={styles.container}>
        <SectionHeader 
          title={`Service History (Total: ₹${filteredCost.toFixed(2)})`}
          actionTitle="+ Add New" 
          onActionPress={() => router.push('/services/add')}
        />
        
        {availableTypes.length > 0 && (
          <View style={styles.filterContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity 
                style={[styles.filterPill, !selectedType && { backgroundColor: colors.primary, borderColor: colors.primary }]}
                onPress={() => setSelectedType(null)}
              >
                <Text style={[styles.filterText, !selectedType && { color: colors.surface }]}>All</Text>
              </TouchableOpacity>
              {availableTypes.map(type => (
                <TouchableOpacity 
                  key={type}
                  style={[styles.filterPill, selectedType === type && { backgroundColor: colors.primary, borderColor: colors.primary }]}
                  onPress={() => setSelectedType(type)}
                >
                  <Text style={[styles.filterText, selectedType === type ? { color: colors.surface } : { color: colors.textSecondary }]}>{type}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
        
        <FlatList
          data={filteredRecords}
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
  filterContainer: {
    marginBottom: spacing.md,
    flexDirection: 'row',
  },
  filterPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: spacing.sm,
  },
  filterText: {
    ...typography.caption,
    fontWeight: '600',
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
