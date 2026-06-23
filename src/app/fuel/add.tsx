import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { Screen, SectionHeader } from '../../components/ui';
import { FuelForm } from '../../features/fuel/components/FuelForm';
import { useFuelStore } from '../../store/fuelStore';
import { useVehicleStore } from '../../store/vehicleStore';
import { spacing } from '../../theme';

export default function AddFuelScreen() {
  const addLog = useFuelStore((state) => state.addLog);
  const currentVehicle = useVehicleStore((state) => state.getCurrentVehicle());
  const [isSaving, setIsSaving] = useState(false);

  if (!currentVehicle) {
    return (
      <Screen>
        <View style={{ padding: spacing.md }}>
          <Text>No vehicle selected.</Text>
        </View>
      </Screen>
    );
  }

  const handleSubmit = async (data: any) => {
    setIsSaving(true);
    await addLog({
      id: Math.random().toString(36).substring(2, 11),
      ...data
    });
    setIsSaving(false);
    router.back();
  };

  return (
    <Screen>
      <View style={{ padding: spacing.md, flex: 1 }}>
        <SectionHeader title="Add Fuel Log" />
        <FuelForm vehicleId={currentVehicle.id} onSubmit={handleSubmit} isLoading={isSaving} />
      </View>
    </Screen>
  );
}
