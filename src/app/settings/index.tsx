import React from 'react';
import { View, ScrollView, StyleSheet, Alert, Text, Switch } from 'react-native';
import { Screen, SectionHeader, Card, Button } from '../../components/ui';
import { useThemeStore } from '../../store/themeStore';
import { BackupService } from '../../services/BackupService';
import { useVehicleStore } from '../../store/vehicleStore';
import { spacing, typography } from '../../theme';
import { useTheme } from '../../hooks/useTheme';

export default function SettingsScreen() {
  const { colors } = useTheme();
  const { mode, setMode } = useThemeStore();
  
  const loadVehicles = useVehicleStore(state => state.loadVehicles);
  
  const handleExport = async () => {
    try {
      await BackupService.exportBackup();
    } catch (e: any) {
      Alert.alert('Export Failed', e.message);
    }
  };

  const handleImport = async () => {
    try {
      const success = await BackupService.importBackup();
      if (success) {
        await loadVehicles();
        Alert.alert('Success', 'Backup imported successfully!');
      }
    } catch (e: any) {
      Alert.alert('Import Failed', e.message);
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Reset App Data',
      'Are you absolutely sure? This will delete all vehicles, logs, and reminders. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: async () => {
            try {
              await BackupService.resetAppData();
              await loadVehicles();
              Alert.alert('App Reset', 'All data has been cleared.');
            } catch (e: any) {
              Alert.alert('Reset Failed', e.message);
            }
          }
        }
      ]
    );
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        
        <SectionHeader title="Appearance" />
        <Card style={styles.card}>
          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
            <Switch 
              value={mode === 'dark'} 
              onValueChange={(val) => setMode(val ? 'dark' : 'light')} 
              trackColor={{ true: colors.primary, false: colors.border }}
            />
          </View>
        </Card>

        <SectionHeader title="Backup & Restore" />
        <Card style={styles.card}>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            Export your data to a JSON file to keep it safe, or import an existing backup to restore your records.
          </Text>
          <Button 
            title="Export Backup" 
            onPress={handleExport} 
            style={styles.button} 
          />
          <Button 
            title="Import Backup" 
            variant="outline"
            onPress={handleImport} 
            style={styles.button} 
          />
        </Card>

        <SectionHeader title="Danger Zone" />
        <Card style={[styles.card, { borderColor: colors.error, borderWidth: 1 }]}>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            Permanently delete all data stored in this app.
          </Text>
          <Button 
            title="Reset App Data" 
            variant="danger"
            onPress={handleReset} 
          />
        </Card>

      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  card: {
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    ...typography.body,
    fontWeight: '600',
  },
  description: {
    ...typography.caption,
    marginBottom: spacing.md,
  },
  button: {
    marginBottom: spacing.sm,
  }
});
