import { getDatabase } from '../database';
import { FuelLog } from '../types/database.types';

export class FuelRepository {
  static async createFuelLog(log: FuelLog): Promise<void> {
    const db = getDatabase();
    await db.runAsync(
      `INSERT INTO fuel_logs (id, vehicleId, date, odometer, fuelAmountLitres, totalCost, fuelType, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        log.id,
        log.vehicleId,
        log.date,
        log.odometer,
        log.fuelAmountLitres,
        log.totalCost,
        log.fuelType,
        log.notes || null,
      ]
    );
  }

  static async getFuelLogsByVehicle(vehicleId: string): Promise<FuelLog[]> {
    const db = getDatabase();
    return await db.getAllAsync<FuelLog>(
      'SELECT * FROM fuel_logs WHERE vehicleId = ? ORDER BY date DESC',
      [vehicleId]
    );
  }

  static async getTotalFuelCostByVehicle(vehicleId: string): Promise<number> {
    const db = getDatabase();
    const result = await db.getFirstAsync<{ total: number }>(
      'SELECT SUM(totalCost) as total FROM fuel_logs WHERE vehicleId = ?',
      [vehicleId]
    );
    return result?.total || 0;
  }
}
