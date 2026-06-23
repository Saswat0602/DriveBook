import { getDatabase } from '../database';
import { FuelLog } from '../types/database.types';

export class FuelRepository {
  static async createFuelLog(log: FuelLog): Promise<void> {
    const db = getDatabase();
    await db.runAsync(
      `INSERT INTO fuel_logs (id, vehicleId, date, odometer, fuelAmountLitres, totalCost, fuelType, attachmentUri, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        log.id,
        log.vehicleId,
        log.date,
        log.odometer,
        log.fuelAmountLitres,
        log.totalCost,
        log.fuelType,
        log.attachmentUri || null,
        log.notes || null,
      ]
    );
  }

  static async updateFuelLog(log: FuelLog): Promise<void> {
    const db = getDatabase();
    await db.runAsync(
      `UPDATE fuel_logs 
       SET date = ?, odometer = ?, fuelAmountLitres = ?, totalCost = ?, fuelType = ?, attachmentUri = ?, notes = ?
       WHERE id = ?`,
      [
        log.date,
        log.odometer,
        log.fuelAmountLitres,
        log.totalCost,
        log.fuelType,
        log.attachmentUri || null,
        log.notes || null,
        log.id,
      ]
    );
  }

  static async deleteFuelLog(id: string): Promise<void> {
    const db = getDatabase();
    await db.runAsync('DELETE FROM fuel_logs WHERE id = ?', [id]);
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
