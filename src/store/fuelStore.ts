import { create } from 'zustand';
import { FuelLog } from '../types/database.types';
import { FuelRepository } from '../repositories/FuelRepository';
import { MileageCalculatorService } from '../services/MileageCalculatorService';

interface FuelState {
  logs: FuelLog[];
  averageMileage: number;
  isLoading: boolean;
  error: string | null;
  
  loadLogs: (vehicleId: string) => Promise<void>;
  addLog: (log: FuelLog) => Promise<void>;
  updateLog: (log: FuelLog) => Promise<void>;
  deleteLog: (id: string, vehicleId: string) => Promise<void>;
}

export const useFuelStore = create<FuelState>((set, get) => ({
  logs: [],
  averageMileage: 0,
  isLoading: false,
  error: null,

  loadLogs: async (vehicleId: string) => {
    set({ isLoading: true, error: null });
    try {
      const logs = await FuelRepository.getFuelLogsByVehicle(vehicleId);
      const averageMileage = MileageCalculatorService.calculateAverageMileage(logs);
      set({ logs, averageMileage, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to load fuel logs', isLoading: false });
    }
  },

  addLog: async (log: FuelLog) => {
    set({ isLoading: true, error: null });
    try {
      await FuelRepository.createFuelLog(log);
      const logs = await FuelRepository.getFuelLogsByVehicle(log.vehicleId);
      const averageMileage = MileageCalculatorService.calculateAverageMileage(logs);
      set({ logs, averageMileage, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to add fuel log', isLoading: false });
    }
  },

  updateLog: async (log: FuelLog) => {
    set({ isLoading: true, error: null });
    try {
      await FuelRepository.updateFuelLog(log);
      const logs = await FuelRepository.getFuelLogsByVehicle(log.vehicleId);
      const averageMileage = MileageCalculatorService.calculateAverageMileage(logs);
      set({ logs, averageMileage, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to update fuel log', isLoading: false });
    }
  },

  deleteLog: async (id: string, vehicleId: string) => {
    set({ isLoading: true, error: null });
    try {
      await FuelRepository.deleteFuelLog(id);
      const logs = await FuelRepository.getFuelLogsByVehicle(vehicleId);
      const averageMileage = MileageCalculatorService.calculateAverageMileage(logs);
      set({ logs, averageMileage, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to delete fuel log', isLoading: false });
    }
  }
}));
