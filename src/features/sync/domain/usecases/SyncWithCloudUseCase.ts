import { SyncStatus } from '../../../../types/sync';
import { SyncRepository } from '../repositories/SyncRepository';

export class SyncWithCloudUseCase {
  constructor(private syncRepo: SyncRepository) {}

  async execute(): Promise<boolean> {
    return this.syncRepo.syncWithCloud();
  }

  async getStatus(): Promise<SyncStatus> {
    return this.syncRepo.getSyncStatus();
  }
}
