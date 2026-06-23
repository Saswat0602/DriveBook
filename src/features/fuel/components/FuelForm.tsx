import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import * as ImagePicker from 'expo-image-picker';
import { Input, Button } from '../../../components/ui';
import { spacing, radius, typography } from '../../../theme';
import { FuelLog } from '../../../types/database.types';
import { FileService } from '../../../services/FileService';
import { useTheme } from '../../../hooks/useTheme';

const fuelSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  odometer: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Valid odometer reading is required',
  }),
  fuelAmountLitres: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Valid fuel amount is required',
  }),
  totalCost: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Valid total cost is required',
  }),
  fuelType: z.string().min(1, 'Fuel Type is required'),
  notes: z.string().optional(),
});

type FuelFormData = z.infer<typeof fuelSchema>;

interface FuelFormProps {
  vehicleId: string;
  initialValues?: Partial<FuelLog>;
  onSubmit: (data: Omit<FuelLog, 'id'>) => Promise<void>;
  isLoading?: boolean;
}

export const FuelForm = ({ vehicleId, initialValues, onSubmit, isLoading = false }: FuelFormProps) => {
  const { colors } = useTheme();
  const [attachmentUri, setAttachmentUri] = useState<string | null>(initialValues?.attachmentUri || null);

  const { control, handleSubmit, formState: { errors } } = useForm<FuelFormData>({
    resolver: zodResolver(fuelSchema),
    defaultValues: {
      date: initialValues?.date || new Date().toISOString().split('T')[0],
      odometer: initialValues?.odometer?.toString() || '',
      fuelAmountLitres: initialValues?.fuelAmountLitres?.toString() || '',
      totalCost: initialValues?.totalCost?.toString() || '',
      fuelType: initialValues?.fuelType || 'Petrol',
      notes: initialValues?.notes || '',
    },
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setAttachmentUri(result.assets[0].uri);
    }
  };

  const handleFormSubmit = async (data: FuelFormData) => {
    let finalAttachmentUri = attachmentUri;

    // If there's a new attachment, save it to the app's document directory
    if (attachmentUri && attachmentUri !== initialValues?.attachmentUri) {
      try {
        finalAttachmentUri = await FileService.saveFileToAppStorage(attachmentUri);
      } catch (e) {
        console.error("Failed to save attachment", e);
      }
    }

    await onSubmit({
      vehicleId,
      date: data.date,
      odometer: Number(data.odometer),
      fuelAmountLitres: Number(data.fuelAmountLitres),
      totalCost: Number(data.totalCost),
      fuelType: data.fuelType,
      notes: data.notes,
      attachmentUri: finalAttachmentUri || undefined,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Controller
        control={control}
        name="date"
        render={({ field: { onChange, value } }) => (
          <Input label="Date (YYYY-MM-DD) *" value={value} onChangeText={onChange} error={errors.date?.message} />
        )}
      />

      <Controller
        control={control}
        name="odometer"
        render={({ field: { onChange, value } }) => (
          <Input label="Odometer (km) *" value={value} onChangeText={onChange} keyboardType="numeric" error={errors.odometer?.message} />
        )}
      />

      <View style={styles.row}>
        <View style={styles.half}>
          <Controller
            control={control}
            name="fuelAmountLitres"
            render={({ field: { onChange, value } }) => (
              <Input label="Volume (Litres) *" value={value} onChangeText={onChange} keyboardType="numeric" error={errors.fuelAmountLitres?.message} />
            )}
          />
        </View>
        <View style={styles.half}>
          <Controller
            control={control}
            name="totalCost"
            render={({ field: { onChange, value } }) => (
              <Input label="Total Cost (₹) *" value={value} onChangeText={onChange} keyboardType="numeric" error={errors.totalCost?.message} />
            )}
          />
        </View>
      </View>

      <Controller
        control={control}
        name="fuelType"
        render={({ field: { onChange, value } }) => (
          <Input label="Fuel Type (Petrol/Diesel/CNG/EV) *" value={value} onChangeText={onChange} error={errors.fuelType?.message} />
        )}
      />

      <View style={styles.attachmentSection}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Receipt / Attachment (Optional)</Text>
        {attachmentUri ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: attachmentUri }} style={styles.image} />
            <TouchableOpacity 
              style={[styles.removeBtn, { backgroundColor: colors.error }]} 
              onPress={() => setAttachmentUri(null)}
            >
              <Text style={{ color: colors.surface, fontWeight: 'bold' }}>X</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Button title="Attach Receipt Photo" variant="outline" onPress={pickImage} />
        )}
      </View>

      <Controller
        control={control}
        name="notes"
        render={({ field: { onChange, value } }) => (
          <Input label="Notes" value={value} onChangeText={onChange} multiline style={{ minHeight: 80 }} />
        )}
      />

      <Button title="Save Fuel Log" onPress={handleSubmit(handleFormSubmit)} isLoading={isLoading} style={styles.submitButton} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  half: {
    flex: 1,
  },
  attachmentSection: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.caption,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  imageContainer: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: radius.md,
  },
  removeBtn: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
});
