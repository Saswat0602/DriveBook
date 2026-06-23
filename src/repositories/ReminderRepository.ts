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
}
