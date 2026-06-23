import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { spacing, radius, typography } from '../../../theme';
import { FuelLog } from '../../../types/database.types';

interface FuelCardProps {
  log: FuelLog;
  mileage?: number;
  onPress?: () => void;
}

export const FuelCard = ({ log, mileage, onPress }: FuelCardProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={[styles.date, { color: colors.text }]}>{log.date}</Text>
        <Text style={[styles.cost, { color: colors.error }]}>₹{log.totalCost.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.infoCol}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Odometer</Text>
          <Text style={[styles.value, { color: colors.text }]}>{log.odometer} km</Text>
        </View>
        <View style={styles.infoCol}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Volume</Text>
          <Text style={[styles.value, { color: colors.text }]}>{log.fuelAmountLitres} L</Text>
        </View>
        <View style={styles.infoCol}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Type</Text>
          <Text style={[styles.value, { color: colors.text }]}>{log.fuelType}</Text>
        </View>
        {mileage !== undefined && mileage > 0 && (
          <View style={styles.infoCol}>
            <Text style={[styles.label, { color: colors.success }]}>Mileage</Text>
            <Text style={[styles.value, { color: colors.success }]}>{mileage.toFixed(1)} km/l</Text>
          </View>
        )}
      </View>

      {(log.notes || log.attachmentUri) && (
        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          {log.notes ? (
            <Text style={[styles.notes, { color: colors.textSecondary }]}>{log.notes}</Text>
          ) : <View />}
          
          {log.attachmentUri && (
            <Image 
              source={{ uri: log.attachmentUri }} 
              style={styles.attachment} 
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  date: {
    ...typography.subheading,
  },
  cost: {
    ...typography.subheading,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  infoCol: {
    alignItems: 'flex-start',
  },
  label: {
    ...typography.caption,
  },
  value: {
    ...typography.body,
    fontWeight: '600',
  },
  footer: {
    borderTopWidth: 1,
    paddingTop: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  notes: {
    ...typography.caption,
    flex: 1,
    marginRight: spacing.sm,
  },
  attachment: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: '#ccc',
  }
});
