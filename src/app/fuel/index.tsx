import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Alert, ScrollView, Text, TouchableOpacity } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Screen, Button, EmptyState, LoadingState, SectionHeader } from '../../components/ui';
import { FuelCard } from '../../features/fuel/components/FuelCard';
import { useFuelStore } from '../../store/fuelStore';
import { useVehicleStore } from '../../store/vehicleStore';
import { spacing, radius, typography } from '../../theme';
import { useTheme } from '../../hooks/useTheme';

export default function FuelLogsScreen() {
  const { colors } = useTheme();
  const { logs, loadLogs, isLoading, deleteLog } = useFuelStore();
  const currentVehicle = useVehicleStore((state) => state.getCurrentVehicle());
  
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

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

  const availableMonths = Array.from(new Set(logs.map(log => log.date.substring(0, 7)))).sort().reverse();
  const filteredLogs = selectedMonth ? logs.filter(log => log.date.startsWith(selectedMonth)) : logs;

  return (
    <Screen>
      <View style={styles.container}>
        <SectionHeader 
          title="Fuel History" 
          actionTitle="+ Add New" 
          onActionPress={() => router.push('/fuel/add')}
        />
        
        {availableMonths.length > 0 && (
          <View style={styles.filterContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity 
                style={[styles.filterPill, !selectedMonth && { backgroundColor: colors.primary, borderColor: colors.primary }]}
                onPress={() => setSelectedMonth(null)}
              >
                <Text style={[styles.filterText, !selectedMonth && { color: colors.surface }]}>All</Text>
              </TouchableOpacity>
              {availableMonths.map(month => (
                <TouchableOpacity 
                  key={month}
                  style={[styles.filterPill, selectedMonth === month && { backgroundColor: colors.primary, borderColor: colors.primary }]}
                  onPress={() => setSelectedMonth(month)}
                >
                  <Text style={[styles.filterText, selectedMonth === month ? { color: colors.surface } : { color: colors.textSecondary }]}>{month}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
        
        <FlatList
          data={filteredLogs}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: spacing.xxl }}
          renderItem={({ item }) => (
            <View>
              <FuelCard log={item} />
              <View style={styles.actions}>
                <Button title="Edit" variant="outline" style={styles.actionBtn} onPress={() => router.push(`/fuel/edit?id=${item.id}`)} />
                <Button title="Delete" variant="danger" style={styles.actionBtn} onPress={() => handleDelete(item.id)} />
              </View>
            </View>
          )}
          ListEmptyComponent={
            <EmptyState title="No Fuel Logs" description="Start tracking your fuel expenses." />
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
