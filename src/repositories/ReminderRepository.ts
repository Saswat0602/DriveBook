import { getDatabase } from '../database';
import { Reminder } from '../types/database.types';

export class ReminderRepository {
  static async createReminder(reminder: Reminder): Promise<void> {
    const db = getDatabase();
    await db.runAsync(
      `INSERT INTO reminders (id, vehicleId, title, dueDate, reminderType, notes) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        reminder.id,
        reminder.vehicleId,
        reminder.title,
        reminder.dueDate,
        reminder.reminderType,
        reminder.notes || null,
      ]
    );
  }

  static async getRemindersByVehicle(vehicleId: string): Promise<Reminder[]> {
    const db = getDatabase();
    return await db.getAllAsync<Reminder>(
      'SELECT * FROM reminders WHERE vehicleId = ? ORDER BY dueDate ASC',
      [vehicleId]
    );
  }

  static async getUpcomingReminders(vehicleId: string, limit: number = 3): Promise<Reminder[]> {
    const db = getDatabase();
    const today = new Date().toISOString().split('T')[0];
    return await db.getAllAsync<Reminder>(
      'SELECT * FROM reminders WHERE vehicleId = ? AND dueDate >= ? ORDER BY dueDate ASC LIMIT ?',
      [vehicleId, today, limit]
    );
  }
}
