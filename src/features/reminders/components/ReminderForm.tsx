import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input, Button } from '../../../components/ui';
import { spacing } from '../../../theme';
import { Reminder } from '../../../types/database.types';

const reminderSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  reminderType: z.string().min(1, 'Reminder type is required'),
  notes: z.string().optional(),
});

type ReminderFormData = z.infer<typeof reminderSchema>;

interface ReminderFormProps {
  vehicleId: string;
  initialValues?: Partial<Reminder>;
  onSubmit: (data: Omit<Reminder, 'id'>) => Promise<void>;
  isLoading?: boolean;
}

export const ReminderForm = ({ vehicleId, initialValues, onSubmit, isLoading = false }: ReminderFormProps) => {
  const { control, handleSubmit, formState: { errors } } = useForm<ReminderFormData>({
    resolver: zodResolver(reminderSchema),
    defaultValues: {
      title: initialValues?.title || '',
      dueDate: initialValues?.dueDate || new Date().toISOString().split('T')[0],
      reminderType: initialValues?.reminderType || 'Insurance',
      notes: initialValues?.notes || '',
    },
  });

  const handleFormSubmit = async (data: ReminderFormData) => {
    await onSubmit({
      vehicleId,
      title: data.title,
      dueDate: data.dueDate,
      reminderType: data.reminderType,
      notes: data.notes,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <Input label="Title *" value={value} onChangeText={onChange} error={errors.title?.message} />
        )}
      />

      <Controller
        control={control}
        name="dueDate"
        render={({ field: { onChange, value } }) => (
          <Input label="Due Date (YYYY-MM-DD) *" value={value} onChangeText={onChange} error={errors.dueDate?.message} />
        )}
      />

      <Controller
        control={control}
        name="reminderType"
        render={({ field: { onChange, value } }) => (
          <Input label="Reminder Type (e.g. Insurance, Service) *" value={value} onChangeText={onChange} error={errors.reminderType?.message} />
        )}
      />

      <Controller
        control={control}
        name="notes"
        render={({ field: { onChange, value } }) => (
          <Input label="Notes" value={value} onChangeText={onChange} multiline style={{ minHeight: 80 }} />
        )}
      />

      <Button title="Save Reminder" onPress={handleSubmit(handleFormSubmit)} isLoading={isLoading} style={styles.submitButton} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  submitButton: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
});
