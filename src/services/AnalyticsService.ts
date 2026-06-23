import { FuelRepository } from '../repositories/FuelRepository';
import { ServiceRepository } from '../repositories/ServiceRepository';
import { MileageCalculatorService } from './MileageCalculatorService';

export class AnalyticsService {
  static async getAnalyticsData(vehicleId: string) {
    const fuelLogs = await FuelRepository.getFuelLogsByVehicle(vehicleId);
    const serviceRecords = await ServiceRepository.getServiceRecordsByVehicle(vehicleId);

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1); // Start of that month

    const monthlyFuelCost: Record<string, number> = {};
    const monthlyServiceCost: Record<string, number> = {};
    
    // Initialize last 6 months with 0
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      monthlyFuelCost[monthStr] = 0;
      monthlyServiceCost[monthStr] = 0;
    }

    fuelLogs.forEach(log => {
      const monthStr = log.date.substring(0, 7); // YYYY-MM
      if (monthlyFuelCost[monthStr] !== undefined) {
        monthlyFuelCost[monthStr] += log.totalCost;
      }
    });

    serviceRecords.forEach(record => {
      const monthStr = record.date.substring(0, 7);
      if (monthlyServiceCost[monthStr] !== undefined) {
        monthlyServiceCost[monthStr] += record.cost;
      }
    });

    // Formatting for react-native-chart-kit
    const formatLabel = (k: string) => {
      const date = new Date(k + '-01');
      return date.toLocaleString('default', { month: 'short' });
    };

    const fuelLabels = Object.keys(monthlyFuelCost).map(formatLabel);
    const fuelData = Object.values(monthlyFuelCost);

    const serviceLabels = Object.keys(monthlyServiceCost).map(formatLabel);
    const serviceData = Object.values(monthlyServiceCost);

    const averageMileage = MileageCalculatorService.calculateAverageMileage(fuelLogs);
    
    // Sum total maintenance
    const yearlyMaintenanceCost = serviceRecords.reduce((acc, curr) => acc + curr.cost, 0);

    return {
      fuelChartData: {
        labels: fuelLabels.length ? fuelLabels : ['N/A'],
        datasets: [{ data: fuelData.length && Math.max(...fuelData) > 0 ? fuelData : [0] }]
      },
      serviceChartData: {
        labels: serviceLabels.length ? serviceLabels : ['N/A'],
        datasets: [{ data: serviceData.length && Math.max(...serviceData) > 0 ? serviceData : [0] }]
      },
      averageMileage,
      yearlyMaintenanceCost
    };
  }
}
