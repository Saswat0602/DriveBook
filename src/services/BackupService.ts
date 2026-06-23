import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import { z } from 'zod';
import { getDatabase } from '../database';

// Zod schema for Backup Validation
const backupSchema = z.object({
  vehicles: z.array(z.any()), // Ensures these keys exist and are arrays
  fuelLogs: z.array(z.any()),
  serviceRecords: z.array(z.any()),
  reminders: z.array(z.any()),
});

export class BackupService {
  static async exportBackup() {
    try {
      const db = getDatabase();
      
      const vehicles = await db.getAllAsync('SELECT * FROM vehicles');
      const fuelLogs = await db.getAllAsync('SELECT * FROM fuel_logs');
      const serviceRecords = await db.getAllAsync('SELECT * FROM service_records');
      const reminders = await db.getAllAsync('SELECT * FROM reminders');

      const backupData = {
        vehicles,
        fuelLogs,
        serviceRecords,
        reminders
      };

      const jsonStr = JSON.stringify(backupData, null, 2);
      
      const filename = `drivebook_backup_${new Date().toISOString().split('T')[0]}.json`;
      const file = new FileSystem.File(FileSystem.Paths.cache, filename);
      
      // Write the file
      await file.write(jsonStr);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(file.uri, {
          mimeType: 'application/json',
          dialogTitle: 'Export DriveBook Backup',
        });
      } else {
        throw new Error('Sharing is not available on this device');
      }
      
    } catch (error) {
      console.error('Failed to export backup:', error);
      throw error;
    }
  }

  static async importBackup(): Promise<boolean> {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
        copyToCacheDirectory: true,
      });

      if (result.canceled || result.assets.length === 0) return false;

      const fileUri = result.assets[0].uri;
      const file = new FileSystem.File(fileUri);
      
      let jsonStr;
      if (file.text) {
        jsonStr = await file.text();
      } else {
        // Fallback for reading file if text() isn't properly supported in the exact expo-file-system version
        const legacyFileStr = await (await file.slice().text()); 
        jsonStr = legacyFileStr;
      }
      
      let parsedData;
      try {
        parsedData = JSON.parse(jsonStr);
      } catch (e) {
        throw new Error('Invalid JSON format.');
      }

      const validation = backupSchema.safeParse(parsedData);
      if (!validation.success) {
        throw new Error('Invalid backup file structure.');
      }

      const db = getDatabase();
      
      await db.withTransactionAsync(async () => {
        // Clear all tables
        await db.runAsync('DELETE FROM vehicles');
        await db.runAsync('DELETE FROM fuel_logs');
        await db.runAsync('DELETE FROM service_records');
        await db.runAsync('DELETE FROM reminders');

        // Insert Vehicles
        for (const v of parsedData.vehicles) {
          await db.runAsync(
            'INSERT INTO vehicles (id, make, model, year, licensePlate, initialOdometer) VALUES (?, ?, ?, ?, ?, ?)',
            [v.id, v.make, v.model, v.year, v.licensePlate, v.initialOdometer]
          );
        }

        // Insert Fuel Logs
        for (const f of parsedData.fuelLogs) {
          await db.runAsync(
            'INSERT INTO fuel_logs (id, vehicleId, date, odometer, fuelAmount, totalCost, pricePerLitre, isFullTank, notes, attachmentUri) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [f.id, f.vehicleId, f.date, f.odometer, f.fuelAmount, f.totalCost, f.pricePerLitre, f.isFullTank ? 1 : 0, f.notes || null, f.attachmentUri || null]
          );
        }

        // Insert Service Records
        for (const s of parsedData.serviceRecords) {
          await db.runAsync(
            'INSERT INTO service_records (id, vehicleId, date, odometer, serviceType, cost, notes, attachmentUri) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [s.id, s.vehicleId, s.date, s.odometer, s.serviceType, s.cost, s.notes || null, s.attachmentUri || null]
          );
        }

        // Insert Reminders
        for (const r of parsedData.reminders) {
          await db.runAsync(
            'INSERT INTO reminders (id, vehicleId, title, dueDate, reminderType, notes) VALUES (?, ?, ?, ?, ?, ?)',
            [r.id, r.vehicleId, r.title, r.dueDate, r.reminderType, r.notes || null]
          );
        }
      });

      return true;

    } catch (error) {
      console.error('Failed to import backup:', error);
      throw error;
    }
  }

  static async resetAppData(): Promise<void> {
    try {
      const db = getDatabase();
      await db.withTransactionAsync(async () => {
        await db.runAsync('DELETE FROM vehicles');
        await db.runAsync('DELETE FROM fuel_logs');
        await db.runAsync('DELETE FROM service_records');
        await db.runAsync('DELETE FROM reminders');
      });
    } catch (error) {
      console.error('Failed to reset app data:', error);
      throw error;
    }
  }
}
