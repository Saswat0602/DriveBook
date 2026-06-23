import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { spacing, radius, typography } from '../../../theme';
import { Vehicle } from '../../../types/database.types';

interface VehicleCardProps {
  vehicle: Vehicle;
  onPress?: () => void;
  isActive?: boolean;
}

export const VehicleCard = ({ vehicle, onPress, isActive = false }: VehicleCardProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: isActive ? colors.primary + '10' : colors.surface,
          borderColor: isActive ? colors.primary : colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={styles.header}>
        <Text style={[styles.name, { color: colors.text }]}>{vehicle.name}</Text>
        <View style={[styles.badge, { backgroundColor: colors.secondary + '20' }]}>
          <Text style={[styles.badgeText, { color: colors.secondary }]}>
            {vehicle.vehicleType}
          </Text>
        </View>
      </View>
      
      <View style={styles.details}>
        <Text style={[styles.detailText, { color: colors.textSecondary }]}>
          {vehicle.brand} {vehicle.model}
        </Text>
        <Text style={[styles.detailText, { color: colors.textSecondary }]}>
          {vehicle.registrationNumber}
        </Text>
      </View>

      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          Odometer: <Text style={{ color: colors.text, fontWeight: '600' }}>{vehicle.currentOdometer} km</Text>
        </Text>
      </View>
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
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  name: {
    ...typography.subheading,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
  },
  badgeText: {
    ...typography.caption,
    fontWeight: '600',
  },
  details: {
    marginBottom: spacing.md,
  },
  detailText: {
    ...typography.body,
    marginBottom: 2,
  },
  footer: {
    borderTopWidth: 1,
    paddingTop: spacing.sm,
  },
  footerText: {
    ...typography.caption,
  },
});
