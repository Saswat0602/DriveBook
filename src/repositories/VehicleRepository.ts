import { getDatabase } from '../database';
import { Vehicle } from '../types/database.types';

export class VehicleRepository {
  static async createVehicle(vehicle: Vehicle): Promise<void> {
    const db = getDatabase();
    await db.runAsync(
      `INSERT INTO vehicles (id, name, registrationNumber, vehicleType, brand, model, purchaseDate, currentOdometer, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        vehicle.id,
        vehicle.name,
        vehicle.registrationNumber,
        vehicle.vehicleType,
        vehicle.brand,
        vehicle.model,
        vehicle.purchaseDate,
        vehicle.currentOdometer,
        vehicle.notes || null,
      ]
    );
  }

  static async getVehicles(): Promise<Vehicle[]> {
    const db = getDatabase();
    const result = await db.getAllAsync<Vehicle>('SELECT * FROM vehicles ORDER BY name ASC');
    return result;
  }

  static async updateVehicle(vehicle: Vehicle): Promise<void> {
    const db = getDatabase();
    await db.runAsync(
      `UPDATE vehicles 
       SET name = ?, registrationNumber = ?, vehicleType = ?, brand = ?, model = ?, purchaseDate = ?, currentOdometer = ?, notes = ?
       WHERE id = ?`,
      [
        vehicle.name,
        vehicle.registrationNumber,
        vehicle.vehicleType,
        vehicle.brand,
        vehicle.model,
        vehicle.purchaseDate,
        vehicle.currentOdometer,
        vehicle.notes || null,
        vehicle.id,
      ]
    );
  }

  static async deleteVehicle(id: string): Promise<void> {
    const db = getDatabase();
    await db.runAsync('DELETE FROM vehicles WHERE id = ?', [id]);
  }
}
