import * as SQLite from 'expo-sqlite';
import { SCHEMA_QUERIES } from './schema';

const DB_NAME = 'motoledger.db';

let dbInstance: SQLite.SQLiteDatabase | null = null;

export const initDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (dbInstance) return dbInstance;
  
  dbInstance = await SQLite.openDatabaseAsync(DB_NAME);
  await dbInstance.execAsync(SCHEMA_QUERIES);
  
  return dbInstance;
};

export const getDatabase = (): SQLite.SQLiteDatabase => {
  if (!dbInstance) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return dbInstance;
};
