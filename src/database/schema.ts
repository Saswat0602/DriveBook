export const SCHEMA_QUERIES = `
PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS vehicles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  registrationNumber TEXT NOT NULL,
  vehicleType TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  purchaseDate TEXT NOT NULL,
  currentOdometer INTEGER NOT NULL,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS fuel_logs (
  id TEXT PRIMARY KEY,
  vehicleId TEXT NOT NULL,
  date TEXT NOT NULL,
  odometer INTEGER NOT NULL,
  fuelAmountLitres REAL NOT NULL,
  totalCost REAL NOT NULL,
  fuelType TEXT NOT NULL,
  attachmentUri TEXT,
  notes TEXT,
  FOREIGN KEY (vehicleId) REFERENCES vehicles (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS service_records (
  id TEXT PRIMARY KEY,
  vehicleId TEXT NOT NULL,
  date TEXT NOT NULL,
  odometer INTEGER NOT NULL,
  serviceType TEXT NOT NULL,
  cost REAL NOT NULL,
  attachmentUri TEXT,
  notes TEXT,
  FOREIGN KEY (vehicleId) REFERENCES vehicles (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reminders (
  id TEXT PRIMARY KEY,
  vehicleId TEXT NOT NULL,
  title TEXT NOT NULL,
  dueDate TEXT NOT NULL,
  reminderType TEXT NOT NULL,
  notes TEXT,
  FOREIGN KEY (vehicleId) REFERENCES vehicles (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_fuel_vehicle_id ON fuel_logs (vehicleId);
CREATE INDEX IF NOT EXISTS idx_fuel_date ON fuel_logs (date);
CREATE INDEX IF NOT EXISTS idx_service_vehicle_id ON service_records (vehicleId);
CREATE INDEX IF NOT EXISTS idx_service_date ON service_records (date);
CREATE INDEX IF NOT EXISTS idx_reminder_vehicle_id ON reminders (vehicleId);
`;
