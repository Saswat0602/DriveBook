import { create } from 'zustand';
import { Reminder } from '../types/database.types';
import { ReminderRepository } from '../repositories/ReminderRepository';
import { NotificationService } from '../services/NotificationService';

interface ReminderState {
  reminders: Reminder[];
  isLoading: boolean;
  error: string | null;
  
  loadReminders: (vehicleId: string) => Promise<void>;
  addReminder: (reminder: Reminder) => Promise<void>;
  updateReminder: (reminder: Reminder) => Promise<void>;
  deleteReminder: (id: string, vehicleId: string) => Promise<void>;
}

export const useReminderStore = create<ReminderState>((set, get) => ({
  reminders: [],
  isLoading: false,
  error: null,

  loadReminders: async (vehicleId: string) => {
    set({ isLoading: true, error: null });
    try {
      const reminders = await ReminderRepository.getRemindersByVehicle(vehicleId);
      set({ reminders, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to load reminders', isLoading: false });
    }
  },

  addReminder: async (reminder: Reminder) => {
    set({ isLoading: true, error: null });
    try {
      await ReminderRepository.createReminder(reminder);
      
      // Schedule notification
      await NotificationService.scheduleReminder(
        reminder.id, 
        reminder.title, 
        reminder.notes || 'You have an upcoming vehicle reminder.', 
        reminder.dueDate
      );
      
      const reminders = await ReminderRepository.getRemindersByVehicle(reminder.vehicleId);
      set({ reminders, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to add reminder', isLoading: false });
    }
  },

  updateReminder: async (reminder: Reminder) => {
    set({ isLoading: true, error: null });
    try {
      await ReminderRepository.updateReminder(reminder);
      
      // Reschedule notification
      await NotificationService.scheduleReminder(
        reminder.id, 
        reminder.title, 
        reminder.notes || 'You have an upcoming vehicle reminder.', 
        reminder.dueDate
      );
      
      const reminders = await ReminderRepository.getRemindersByVehicle(reminder.vehicleId);
      set({ reminders, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to update reminder', isLoading: false });
    }
  },

  deleteReminder: async (id: string, vehicleId: string) => {
    set({ isLoading: true, error: null });
    try {
      await ReminderRepository.deleteReminder(id);
      
      // Cancel notifications
      await NotificationService.cancelReminder(id);
      
      const reminders = await ReminderRepository.getRemindersByVehicle(vehicleId);
      set({ reminders, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to delete reminder', isLoading: false });
    }
  }
}));
