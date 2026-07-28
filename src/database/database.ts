import * as SQLite from 'expo-sqlite';
import { CREATE_TABLES_SQL } from './schema';
import { seedDatabase } from './seed';

const DATABASE_NAME = 'bingcart.db';

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = (async () => {
      const db = await SQLite.openDatabaseAsync(DATABASE_NAME);
      await db.execAsync('PRAGMA foreign_keys = ON;');
      await db.execAsync(CREATE_TABLES_SQL);
      await seedDatabase(db);
      return db;
    })();
  }
  return dbPromise;
}
