import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Screen, SectionHeader } from '../../components/ui';
import { ServiceForm } from '../../features/services/components/ServiceForm';
import { useServiceStore } from '../../store/serviceStore';
import { spacing } from '../../theme';

export default function EditServiceScreen() {
  const { id } = useLocalSearchParams();
  const { records, updateRecord } = useServiceStore();
  const [isSaving, setIsSaving] = useState(false);

  const record = records.find(r => r.id === id);

  if (!record) {
    return (
      <Screen>
        <View style={{ padding: spacing.md }}>
          <Text>Service record not found</Text>
        </View>
      </Screen>
    );
  }

  const handleSubmit = async (data: any) => {
    setIsSaving(true);
    await updateRecord({
      id: record.id,
      ...data
    });
    setIsSaving(false);
    router.back();
  };

  return (
    <Screen>
      <View style={{ padding: spacing.md, flex: 1 }}>
        <SectionHeader title="Edit Service Record" />
        <ServiceForm vehicleId={record.vehicleId} initialValues={record} onSubmit={handleSubmit} isLoading={isSaving} />
      </View>
    </Screen>
  );
}
