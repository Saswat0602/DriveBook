import { create } from 'zustand';
import { ServiceRecord } from '../types/database.types';
import { ServiceRepository } from '../repositories/ServiceRepository';

interface ServiceState {
  records: ServiceRecord[];
  totalMaintenanceCost: number;
  isLoading: boolean;
  error: string | null;
  
  loadRecords: (vehicleId: string) => Promise<void>;
  addRecord: (record: ServiceRecord) => Promise<void>;
  updateRecord: (record: ServiceRecord) => Promise<void>;
  deleteRecord: (id: string, vehicleId: string) => Promise<void>;
}

export const useServiceStore = create<ServiceState>((set, get) => ({
  records: [],
  totalMaintenanceCost: 0,
  isLoading: false,
  error: null,

  loadRecords: async (vehicleId: string) => {
    set({ isLoading: true, error: null });
    try {
      const records = await ServiceRepository.getServiceRecordsByVehicle(vehicleId);
      const totalMaintenanceCost = await ServiceRepository.getTotalMaintenanceCostByVehicle(vehicleId);
      set({ records, totalMaintenanceCost, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to load service records', isLoading: false });
    }
  },

  addRecord: async (record: ServiceRecord) => {
    set({ isLoading: true, error: null });
    try {
      await ServiceRepository.createServiceRecord(record);
      const records = await ServiceRepository.getServiceRecordsByVehicle(record.vehicleId);
      const totalMaintenanceCost = await ServiceRepository.getTotalMaintenanceCostByVehicle(record.vehicleId);
      set({ records, totalMaintenanceCost, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to add service record', isLoading: false });
    }
  },

  updateRecord: async (record: ServiceRecord) => {
    set({ isLoading: true, error: null });
    try {
      await ServiceRepository.updateServiceRecord(record);
      const records = await ServiceRepository.getServiceRecordsByVehicle(record.vehicleId);
      const totalMaintenanceCost = await ServiceRepository.getTotalMaintenanceCostByVehicle(record.vehicleId);
      set({ records, totalMaintenanceCost, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to update service record', isLoading: false });
    }
  },

  deleteRecord: async (id: string, vehicleId: string) => {
    set({ isLoading: true, error: null });
    try {
      await ServiceRepository.deleteServiceRecord(id);
      const records = await ServiceRepository.getServiceRecordsByVehicle(vehicleId);
      const totalMaintenanceCost = await ServiceRepository.getTotalMaintenanceCostByVehicle(vehicleId);
      set({ records, totalMaintenanceCost, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to delete service record', isLoading: false });
    }
  }
}));
