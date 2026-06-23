import { getDatabase } from '../database';
import { ServiceRecord } from '../types/database.types';

export class ServiceRepository {
  static async createServiceRecord(record: ServiceRecord): Promise<void> {
    const db = getDatabase();
    await db.runAsync(
      `INSERT INTO service_records (id, vehicleId, date, odometer, serviceType, cost, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        record.id,
        record.vehicleId,
        record.date,
        record.odometer,
        record.serviceType,
        record.cost,
        record.notes || null,
      ]
    );
  }

  static async getServiceRecordsByVehicle(vehicleId: string): Promise<ServiceRecord[]> {
    const db = getDatabase();
    return await db.getAllAsync<ServiceRecord>(
      'SELECT * FROM service_records WHERE vehicleId = ? ORDER BY date DESC',
      [vehicleId]
    );
  }

  static async getTotalMaintenanceCostByVehicle(vehicleId: string): Promise<number> {
    const db = getDatabase();
    const result = await db.getFirstAsync<{ total: number }>(
      'SELECT SUM(cost) as total FROM service_records WHERE vehicleId = ?',
      [vehicleId]
    );
    return result?.total || 0;
  }
}
