export interface Vehicle {
  id: string;
  name: string;
  registrationNumber: string;
  vehicleType: 'Bike' | 'Car' | 'Scooter' | 'Other';
  brand: string;
  model: string;
  purchaseDate: string;
  currentOdometer: number;
  notes?: string;
}

export interface FuelLog {
  id: string;
  vehicleId: string;
  date: string;
  odometer: number;
  fuelAmountLitres: number;
  totalCost: number;
  fuelType: string;
  notes?: string;
}

export interface ServiceRecord {
  id: string;
  vehicleId: string;
  date: string;
  odometer: number;
  serviceType: string;
  cost: number;
  notes?: string;
}

export interface Reminder {
  id: string;
  vehicleId: string;
  title: string;
  dueDate: string;
  reminderType: string;
  notes?: string;
}
