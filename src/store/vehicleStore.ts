import { create } from 'zustand';
import { Vehicle } from '../types/database.types';
import { VehicleRepository } from '../repositories/VehicleRepository';

interface VehicleState {
  vehicles: Vehicle[];
  currentVehicleId: string | null;
  isLoading: boolean;
  error: string | null;
  
  loadVehicles: () => Promise<void>;
  addVehicle: (vehicle: Vehicle) => Promise<void>;
  updateVehicle: (vehicle: Vehicle) => Promise<void>;
  deleteVehicle: (id: string) => Promise<void>;
  setCurrentVehicleId: (id: string | null) => void;
  getCurrentVehicle: () => Vehicle | undefined;
}

export const useVehicleStore = create<VehicleState>((set, get) => ({
  vehicles: [],
  currentVehicleId: null,
  isLoading: false,
  error: null,

  loadVehicles: async () => {
    set({ isLoading: true, error: null });
    try {
      const vehicles = await VehicleRepository.getVehicles();
      const currentId = get().currentVehicleId;
      set({ 
        vehicles, 
        isLoading: false,
        currentVehicleId: currentId && vehicles.some(v => v.id === currentId) 
          ? currentId 
          : vehicles.length > 0 ? vehicles[0].id : null
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to load vehicles', isLoading: false });
    }
  },

  addVehicle: async (vehicle) => {
    set({ isLoading: true, error: null });
    try {
      await VehicleRepository.createVehicle(vehicle);
      const vehicles = await VehicleRepository.getVehicles();
      set({ 
        vehicles, 
        isLoading: false,
        currentVehicleId: vehicle.id // Automatically select newly added vehicle
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to add vehicle', isLoading: false });
    }
  },

  updateVehicle: async (vehicle) => {
    set({ isLoading: true, error: null });
    try {
      await VehicleRepository.updateVehicle(vehicle);
      const vehicles = await VehicleRepository.getVehicles();
      set({ vehicles, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || 'Failed to update vehicle', isLoading: false });
    }
  },

  deleteVehicle: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await VehicleRepository.deleteVehicle(id);
      const vehicles = await VehicleRepository.getVehicles();
      const currentId = get().currentVehicleId;
      set({ 
        vehicles, 
        isLoading: false,
        currentVehicleId: currentId === id 
          ? (vehicles.length > 0 ? vehicles[0].id : null) 
          : currentId
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to delete vehicle', isLoading: false });
    }
  },

  setCurrentVehicleId: (id) => {
    set({ currentVehicleId: id });
  },

  getCurrentVehicle: () => {
    const { vehicles, currentVehicleId } = get();
    if (!currentVehicleId) return undefined;
    return vehicles.find(v => v.id === currentVehicleId);
  }
}));
