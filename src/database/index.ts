import * as SQLite from 'expo-sqlite';
import { SCHEMA_QUERIES } from './schema';

const DB_NAME = 'motoledger.db';

let dbInstance: SQLite.SQLiteDatabase | null = null;

export const initDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (dbInstance) return dbInstance;
  
  dbInstance = await SQLite.openDatabaseAsync(DB_NAME);
  await dbInstance.execAsync(SCHEMA_QUERIES);
  
  // Safe migration for existing dev tables
  try {
    await dbInstance.execAsync('ALTER TABLE fuel_logs ADD COLUMN attachmentUri TEXT;');
  } catch (e) {
    // Column already exists, ignore
  }
  
  try {
    await dbInstance.execAsync('ALTER TABLE service_records ADD COLUMN attachmentUri TEXT;');
  } catch (e) {
    // Column already exists, ignore
  }
  
  return dbInstance;
};

export const getDatabase = (): SQLite.SQLiteDatabase => {
  if (!dbInstance) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return dbInstance;
};
