import React, { useState, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { Screen, SectionHeader, Card, LoadingState, EmptyState } from '../../components/ui';
import { AnalyticsService } from '../../services/AnalyticsService';
import { useVehicleStore } from '../../store/vehicleStore';
import { spacing, typography, radius } from '../../theme';
import { useTheme } from '../../hooks/useTheme';

const screenWidth = Dimensions.get('window').width;

export default function ReportsScreen() {
  const { colors } = useTheme();
  const currentVehicle = useVehicleStore((state) => state.getCurrentVehicle());
  
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      if (currentVehicle?.id) {
        setIsLoading(true);
        AnalyticsService.getAnalyticsData(currentVehicle.id)
          .then(res => {
            setData(res);
            setIsLoading(false);
          })
          .catch(err => {
            console.error(err);
            setIsLoading(false);
          });
      }
    }, [currentVehicle?.id])
  );

  if (!currentVehicle) {
    return (
      <Screen>
        <EmptyState title="No Vehicle Selected" description="Please select a vehicle to view reports." />
      </Screen>
    );
  }

  if (isLoading || !data) {
    return <LoadingState message="Analyzing data..." />;
  }

  // Convert hex color to rgba for chart-kit
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 122, 255';
  };

  const chartConfig = {
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    color: (opacity = 1) => `rgba(${hexToRgb(colors.primary)}, ${opacity})`,
    labelColor: (opacity = 1) => colors.textSecondary,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <SectionHeader title="Vehicle Analytics" />
        
        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Avg Mileage</Text>
            <Text style={[styles.statValue, { color: colors.text }]}>{data.averageMileage.toFixed(1)} km/l</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Maintenance</Text>
            <Text style={[styles.statValue, { color: colors.error }]}>₹{data.yearlyMaintenanceCost.toFixed(0)}</Text>
          </Card>
        </View>

        <SectionHeader title="Fuel Spending (Last 6 Months)" />
        <Card style={styles.chartCard}>
          <BarChart
            data={data.fuelChartData}
            width={screenWidth - spacing.md * 4}
            height={220}
            yAxisLabel="₹"
            yAxisSuffix=""
            chartConfig={chartConfig}
            style={styles.chartStyle}
            fromZero
          />
        </Card>

        <SectionHeader title="Service Cost (Last 6 Months)" />
        <Card style={styles.chartCard}>
          <LineChart
            data={data.serviceChartData}
            width={screenWidth - spacing.md * 4}
            height={220}
            yAxisLabel="₹"
            yAxisSuffix=""
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(${hexToRgb(colors.error)}, ${opacity})`,
            }}
            bezier
            style={styles.chartStyle}
            fromZero
          />
        </Card>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  statLabel: {
    ...typography.caption,
    marginBottom: spacing.xs,
  },
  statValue: {
    ...typography.subheading,
    fontWeight: 'bold',
  },
  chartCard: {
    padding: spacing.md,
    marginBottom: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartStyle: {
    borderRadius: radius.md,
  }
});
