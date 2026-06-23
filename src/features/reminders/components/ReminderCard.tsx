import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { spacing, radius, typography } from '../../../theme';
import { Reminder } from '../../../types/database.types';

interface ReminderCardProps {
  reminder: Reminder;
  onPress?: () => void;
}

export const ReminderCard = ({ reminder, onPress }: ReminderCardProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{reminder.title}</Text>
        <Text style={[styles.date, { color: colors.error }]}>Due: {reminder.dueDate}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.type, { color: colors.textSecondary }]}>{reminder.reminderType}</Text>
      </View>
      {reminder.notes ? (
        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          <Text style={[styles.notes, { color: colors.textSecondary }]}>{reminder.notes}</Text>
        </View>
      ) : null}
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
  title: {
    ...typography.subheading,
    fontWeight: 'bold',
  },
  date: {
    ...typography.subheading,
  },
  row: {
    marginBottom: spacing.sm,
  },
  type: {
    ...typography.caption,
  },
  footer: {
    borderTopWidth: 1,
    paddingTop: spacing.sm,
    marginTop: spacing.xs,
  },
  notes: {
    ...typography.caption,
  },
});
