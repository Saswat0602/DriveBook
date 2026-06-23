import { FuelLog } from '../types/database.types';

export class MileageCalculatorService {
  /**
   * Calculates the mileage (km/l) between two fuel logs.
   * Assumes logs are sorted by date descending.
   */
  static calculateMileage(currentLog: FuelLog, previousLog?: FuelLog): number {
    if (!previousLog) return 0;
    
    const distance = currentLog.odometer - previousLog.odometer;
    if (distance <= 0 || currentLog.fuelAmountLitres <= 0) return 0;
    
    return distance / currentLog.fuelAmountLitres;
  }

  /**
   * Calculates average mileage from a list of fuel logs.
   */
  static calculateAverageMileage(logs: FuelLog[]): number {
    if (logs.length < 2) return 0;

    // Assuming logs are sorted descending by date
    const sortedLogs = [...logs].sort((a, b) => b.odometer - a.odometer);
    
    const firstLog = sortedLogs[sortedLogs.length - 1];
    const lastLog = sortedLogs[0];
    
    const totalDistance = lastLog.odometer - firstLog.odometer;
    
    // Total fuel used excludes the fuel from the first log, as that fuel
    // wasn't used to travel the distance *between* the logs.
    const totalFuelUsed = sortedLogs
      .slice(0, sortedLogs.length - 1)
      .reduce((sum, log) => sum + log.fuelAmountLitres, 0);

    if (totalDistance <= 0 || totalFuelUsed <= 0) return 0;
    
    return totalDistance / totalFuelUsed;
  }
}
