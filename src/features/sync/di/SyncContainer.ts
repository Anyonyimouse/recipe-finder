import { SQLiteSyncRepository } from '../data/repositories/SQLiteSyncRepository';
import { SyncRepository } from '../domain/repositories/SyncRepository';
import { SyncWithCloudUseCase } from '../domain/usecases/SyncWithCloudUseCase';

export const syncRepository: SyncRepository = new SQLiteSyncRepository();
export const syncWithCloudUseCase = new SyncWithCloudUseCase(syncRepository);
