import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input, Button } from '../../../components/ui';
import { spacing } from '../../../theme';
import { Vehicle } from '../../../types/database.types';

const vehicleSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  registrationNumber: z.string().min(1, 'Registration Number is required'),
  vehicleType: z.enum(['Bike', 'Car', 'Scooter', 'Other'], {
    message: 'Must be Bike, Car, Scooter, or Other'
  }),
  brand: z.string().min(1, 'Brand is required'),
  model: z.string().min(1, 'Model is required'),
  purchaseDate: z.string().min(1, 'Purchase Date is required'),
  currentOdometer: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: 'Odometer must be a valid positive number',
  }),
  notes: z.string().optional(),
});

type VehicleFormData = z.infer<typeof vehicleSchema>;

interface VehicleFormProps {
  initialValues?: Partial<Vehicle>;
  onSubmit: (data: Omit<Vehicle, 'id'>) => Promise<void>;
  isLoading?: boolean;
}

export const VehicleForm = ({ initialValues, onSubmit, isLoading = false }: VehicleFormProps) => {
  const { control, handleSubmit, formState: { errors } } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      name: initialValues?.name || '',
      registrationNumber: initialValues?.registrationNumber || '',
      vehicleType: initialValues?.vehicleType || 'Bike',
      brand: initialValues?.brand || '',
      model: initialValues?.model || '',
      purchaseDate: initialValues?.purchaseDate || new Date().toISOString().split('T')[0],
      currentOdometer: initialValues?.currentOdometer?.toString() || '',
      notes: initialValues?.notes || '',
    },
  });

  const handleFormSubmit = async (data: VehicleFormData) => {
    await onSubmit({
      ...data,
      currentOdometer: Number(data.currentOdometer),
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Vehicle Name *"
            placeholder="e.g. My Daily Commuter"
            value={value}
            onChangeText={onChange}
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="registrationNumber"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Registration Number *"
            placeholder="e.g. AB 12 CD 3456"
            value={value}
            onChangeText={onChange}
            autoCapitalize="characters"
            error={errors.registrationNumber?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="vehicleType"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Vehicle Type (Bike, Car, Scooter, Other) *"
            placeholder="e.g. Bike"
            value={value}
            onChangeText={onChange}
            error={errors.vehicleType?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="brand"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Brand *"
            placeholder="e.g. Honda"
            value={value}
            onChangeText={onChange}
            error={errors.brand?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="model"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Model *"
            placeholder="e.g. Civic"
            value={value}
            onChangeText={onChange}
            error={errors.model?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="purchaseDate"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Purchase Date (YYYY-MM-DD) *"
            placeholder="e.g. 2023-01-15"
            value={value}
            onChangeText={onChange}
            error={errors.purchaseDate?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="currentOdometer"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Current Odometer (km) *"
            placeholder="e.g. 15000"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
            error={errors.currentOdometer?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="notes"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Notes (Optional)"
            placeholder="Any additional information..."
            value={value}
            onChangeText={onChange}
            multiline
            style={{ minHeight: 80 }}
            error={errors.notes?.message}
          />
        )}
      />

      <Button
        title="Save Vehicle"
        onPress={handleSubmit(handleFormSubmit)}
        isLoading={isLoading}
        style={styles.submitButton}
      />
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
