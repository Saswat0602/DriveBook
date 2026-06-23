import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { spacing, radius, typography } from '../../../theme';
import { ServiceRecord } from '../../../types/database.types';

interface ServiceCardProps {
  record: ServiceRecord;
  onPress?: () => void;
}

export const ServiceCard = ({ record, onPress }: ServiceCardProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={[styles.date, { color: colors.text }]}>{record.date}</Text>
        <Text style={[styles.cost, { color: colors.error }]}>₹{record.cost.toFixed(2)}</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.infoCol}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Odometer</Text>
          <Text style={[styles.value, { color: colors.text }]}>{record.odometer} km</Text>
        </View>
        <View style={styles.infoCol}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Service Type</Text>
          <Text style={[styles.value, { color: colors.text }]}>{record.serviceType}</Text>
        </View>
      </View>

      {(record.notes || record.attachmentUri) && (
        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          {record.notes ? (
            <Text style={[styles.notes, { color: colors.textSecondary }]}>{record.notes}</Text>
          ) : <View />}
          
          {record.attachmentUri && (
            <Image 
              source={{ uri: record.attachmentUri }} 
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
    justifyContent: 'flex-start',
    gap: spacing.xl,
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
