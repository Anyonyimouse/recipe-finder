import { SyncWithCloudUseCase } from '../SyncWithCloudUseCase';
import { SyncRepository } from '../../repositories/SyncRepository';
import { SyncStatus } from '../../../../../types/sync';

describe('SyncWithCloudUseCase', () => {
  let mockRepo: jest.Mocked<SyncRepository>;
  let useCase: SyncWithCloudUseCase;

  const mockStatus: SyncStatus = {
    lastSync: '2026-08-19T22:00:00.000Z',
    databaseVersion: 17,
    recipeCount: 500,
    isSyncing: false,
  };

  beforeEach(() => {
    mockRepo = {
      getSyncStatus: jest.fn(),
      syncWithCloud: jest.fn(),
    };
    useCase = new SyncWithCloudUseCase(mockRepo);
  });

  it('should execute sync operation delegating to SyncRepository', async () => {
    mockRepo.syncWithCloud.mockResolvedValue(true);

    const result = await useCase.execute();

    expect(mockRepo.syncWithCloud).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it('should retrieve sync status delegating to SyncRepository', async () => {
    mockRepo.getSyncStatus.mockResolvedValue(mockStatus);

    const status = await useCase.getStatus();

    expect(mockRepo.getSyncStatus).toHaveBeenCalled();
    expect(status).toEqual(mockStatus);
  });
});
