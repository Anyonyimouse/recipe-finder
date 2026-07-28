import { SyncStatus } from '../../../../types/sync';

export interface SyncRepository {
  getSyncStatus(): Promise<SyncStatus>;
  syncWithCloud(): Promise<boolean>;
}
