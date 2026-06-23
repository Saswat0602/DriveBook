import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Screen, Card, SectionHeader, Button, EmptyState } from '../components/ui';
import { useVehicleStore } from '../store/vehicleStore';
import { FuelRepository } from '../repositories/FuelRepository';
import { ServiceRepository } from '../repositories/ServiceRepository';
import { ReminderRepository } from '../repositories/ReminderRepository';
import { Reminder } from '../types/database.types';
import { spacing, typography, radius } from '../theme';
import { useTheme } from '../hooks/useTheme';

export default function DashboardScreen() {
  const { colors } = useTheme();
  const { vehicles, getCurrentVehicle, loadVehicles } = useVehicleStore();
  
  const [totalFuelCost, setTotalFuelCost] = useState(0);
  const [totalServiceCost, setTotalServiceCost] = useState(0);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const vehicle = getCurrentVehicle();

  const loadDashboardData = useCallback(async () => {
    if (!vehicle) return;
    
    try {
      const [fuelCost, serviceCost, upcomingReminders] = await Promise.all([
        FuelRepository.getTotalFuelCostByVehicle(vehicle.id),
        ServiceRepository.getTotalMaintenanceCostByVehicle(vehicle.id),
        ReminderRepository.getUpcomingReminders(vehicle.id, 3)
      ]);
      
      setTotalFuelCost(fuelCost);
      setTotalServiceCost(serviceCost);
      setReminders(upcomingReminders);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [vehicle]);

  useFocusEffect(
    useCallback(() => {
      loadVehicles().then(() => {
        loadDashboardData();
      });
    }, [loadDashboardData])
  );

  if (!vehicles.length) {
    return (
      <Screen>
        <EmptyState 
          title="Welcome to MotoLedger" 
          description="Add a vehicle to get started tracking your expenses and maintenance." 
        />
        <View style={{ padding: spacing.md }}>
          <Button title="Add Vehicle" onPress={() => router.push('/vehicles/add')} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Vehicle Summary */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>{vehicle?.name}</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {vehicle?.registrationNumber} • {vehicle?.currentOdometer} km
          </Text>
        </View>

        {/* Quick Stats */}
        <SectionHeader title="Quick Stats" />
        <View style={styles.statsRow}>
          <Card style={[styles.statCard, { flex: 1, marginRight: spacing.sm }]}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Fuel</Text>
            <Text style={[styles.statValue, { color: colors.text }]}>₹{totalFuelCost.toFixed(2)}</Text>
          </Card>
          <Card style={[styles.statCard, { flex: 1, marginLeft: spacing.sm }]}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Maintenance</Text>
            <Text style={[styles.statValue, { color: colors.text }]}>₹{totalServiceCost.toFixed(2)}</Text>
          </Card>
        </View>

        {/* Upcoming Reminders */}
        <SectionHeader title="Upcoming Reminders" />
        {reminders.length === 0 ? (
          <Card>
            <Text style={{ color: colors.textSecondary, textAlign: 'center' }}>No upcoming reminders</Text>
          </Card>
        ) : (
          reminders.map(reminder => (
            <Card key={reminder.id} style={styles.reminderCard}>
              <Text style={[styles.reminderTitle, { color: colors.text }]}>{reminder.title}</Text>
              <Text style={[styles.reminderDate, { color: colors.error }]}>Due: {reminder.dueDate}</Text>
            </Card>
          ))
        )}

        {/* Quick Actions */}
        <SectionHeader title="Quick Actions" />
        <View style={styles.actionsGrid}>
          <Button 
            title="Add Fuel Log" 
            onPress={() => router.push('/fuel/add')} 
            style={styles.actionBtn} 
          />
          <Button 
            title="Add Service" 
            onPress={() => router.push('/services/add')} 
            style={styles.actionBtn} 
          />
          <Button 
            title="Add Reminder" 
            onPress={() => router.push('/reminders/add')} 
            style={styles.actionBtn} 
          />
          <Button 
            title="Manage Vehicles" 
            variant="secondary"
            onPress={() => router.push('/vehicles')} 
            style={styles.actionBtn} 
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  header: {
    marginBottom: spacing.lg,
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  title: {
    ...typography.heading,
  },
  subtitle: {
    ...typography.body,
    marginTop: spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  statCard: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  statLabel: {
    ...typography.caption,
    marginBottom: spacing.xs,
  },
  statValue: {
    ...typography.subheading,
    fontWeight: 'bold',
  },
  reminderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  reminderTitle: {
    ...typography.body,
    fontWeight: '600',
  },
  reminderDate: {
    ...typography.caption,
  },
  actionsGrid: {
    gap: spacing.sm,
  },
  actionBtn: {
    width: '100%',
  }
});
