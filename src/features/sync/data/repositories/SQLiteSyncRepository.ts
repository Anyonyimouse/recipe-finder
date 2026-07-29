import { SyncRepository } from '../../domain/repositories/SyncRepository';
import { SyncStatus } from '../../../../types/sync';
import { getDatabase } from '../../../../database/database';

export class SQLiteSyncRepository implements SyncRepository {
  async getSyncStatus(): Promise<SyncStatus> {
    const db = await getDatabase();
    const lastSyncRow = await db.getFirstAsync<{ value: string }>(
      "SELECT value FROM sync_metadata WHERE key = 'last_sync'"
    );
    const versionRow = await db.getFirstAsync<{ value: string }>(
      "SELECT value FROM sync_metadata WHERE key = 'database_version'"
    );
    const countRow = await db.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM recipes'
    );

    return {
      lastSync: lastSyncRow?.value || null,
      databaseVersion: parseInt(versionRow?.value || '17', 10),
      recipeCount: countRow?.count || 0,
      isSyncing: false,
    };
  }

  async syncWithCloud(): Promise<boolean> {
    // Pure offline mode: status check on local SQLite
    const db = await getDatabase();
    await db.runAsync(
      "INSERT OR REPLACE INTO sync_metadata (key, value) VALUES ('last_sync', ?)",
      [new Date().toISOString()]
    );
    return true;
  }
}
