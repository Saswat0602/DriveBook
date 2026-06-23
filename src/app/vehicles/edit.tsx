import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Screen, SectionHeader } from '../../components/ui';
import { VehicleForm } from '../../features/vehicles/components/VehicleForm';
import { useVehicleStore } from '../../store/vehicleStore';
import { spacing } from '../../theme';

export default function EditVehicleScreen() {
  const { id } = useLocalSearchParams();
  const { vehicles, updateVehicle } = useVehicleStore();
  const [isSaving, setIsSaving] = useState(false);

  const vehicle = vehicles.find(v => v.id === id);

  if (!vehicle) {
    return (
      <Screen>
        <View style={{ padding: spacing.md }}>
          <Text>Vehicle not found</Text>
        </View>
      </Screen>
    );
  }

  const handleSubmit = async (data: any) => {
    setIsSaving(true);
    await updateVehicle({
      id: vehicle.id,
      ...data
    });
    setIsSaving(false);
    router.back();
  };

  return (
    <Screen>
      <View style={{ padding: spacing.md, flex: 1 }}>
        <SectionHeader title="Edit Vehicle" />
        <VehicleForm initialValues={vehicle} onSubmit={handleSubmit} isLoading={isSaving} />
      </View>
    </Screen>
  );
}
