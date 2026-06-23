import React, { useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { Screen, SectionHeader } from '../../components/ui';
import { VehicleForm } from '../../features/vehicles/components/VehicleForm';
import { useVehicleStore } from '../../store/vehicleStore';
import { spacing } from '../../theme';

export default function AddVehicleScreen() {
  const addVehicle = useVehicleStore((state) => state.addVehicle);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSaving(true);
    await addVehicle({
      id: Math.random().toString(36).substring(2, 11),
      ...data
    });
    setIsSaving(false);
    router.back();
  };

  return (
    <Screen>
      <View style={{ padding: spacing.md, flex: 1 }}>
        <SectionHeader title="Add Vehicle" />
        <VehicleForm onSubmit={handleSubmit} isLoading={isSaving} />
      </View>
    </Screen>
  );
}
