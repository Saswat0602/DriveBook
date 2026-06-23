import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Screen, SectionHeader } from '../../components/ui';
import { FuelForm } from '../../features/fuel/components/FuelForm';
import { useFuelStore } from '../../store/fuelStore';
import { spacing } from '../../theme';

export default function EditFuelScreen() {
  const { id } = useLocalSearchParams();
  const { logs, updateLog } = useFuelStore();
  const [isSaving, setIsSaving] = useState(false);

  const log = logs.find(l => l.id === id);

  if (!log) {
    return (
      <Screen>
        <View style={{ padding: spacing.md }}>
          <Text>Fuel log not found</Text>
        </View>
      </Screen>
    );
  }

  const handleSubmit = async (data: any) => {
    setIsSaving(true);
    await updateLog({
      id: log.id,
      ...data
    });
    setIsSaving(false);
    router.back();
  };

  return (
    <Screen>
      <View style={{ padding: spacing.md, flex: 1 }}>
        <SectionHeader title="Edit Fuel Log" />
        <FuelForm vehicleId={log.vehicleId} initialValues={log} onSubmit={handleSubmit} isLoading={isSaving} />
      </View>
    </Screen>
  );
}
