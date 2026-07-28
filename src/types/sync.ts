export interface SyncMetadata {
  key: string;
  value: string;
}

export interface SyncStatus {
  lastSync: string | null;
  databaseVersion: number;
  recipeCount: number;
  isSyncing: boolean;
  error?: string | null;
}
