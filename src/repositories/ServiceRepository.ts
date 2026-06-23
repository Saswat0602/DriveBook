import { getDatabase } from '../database';
import { ServiceRecord } from '../types/database.types';

export class ServiceRepository {
  static async createServiceRecord(record: ServiceRecord): Promise<void> {
    const db = getDatabase();
    await db.runAsync(
      `INSERT INTO service_records (id, vehicleId, date, odometer, serviceType, cost, attachmentUri, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        record.id,
        record.vehicleId,
        record.date,
        record.odometer,
        record.serviceType,
        record.cost,
        record.attachmentUri || null,
        record.notes || null,
      ]
    );
  }

  static async updateServiceRecord(record: ServiceRecord): Promise<void> {
    const db = getDatabase();
    await db.runAsync(
      `UPDATE service_records 
       SET date = ?, odometer = ?, serviceType = ?, cost = ?, attachmentUri = ?, notes = ?
       WHERE id = ?`,
      [
        record.date,
        record.odometer,
        record.serviceType,
        record.cost,
        record.attachmentUri || null,
        record.notes || null,
        record.id,
      ]
    );
  }

  static async deleteServiceRecord(id: string): Promise<void> {
    const db = getDatabase();
    await db.runAsync('DELETE FROM service_records WHERE id = ?', [id]);
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
