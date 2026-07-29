import { useState, useEffect, useCallback } from 'react';
import { SyncStatus } from '../../../../types/sync';
import { SQLiteSyncRepository } from '../../data/repositories/SQLiteSyncRepository';

const repo = new SQLiteSyncRepository();

export function useSync() {
  const [status, setStatus] = useState<SyncStatus | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchStatus = useCallback(async () => {
    const currentStatus = await repo.getSyncStatus();
    setStatus(currentStatus);
  }, []);

  const triggerSync = useCallback(async () => {
    setIsSyncing(true);
    await repo.syncWithCloud();
    await fetchStatus();
    setIsSyncing(false);
  }, [fetchStatus]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return {
    status,
    isSyncing,
    triggerSync,
    refreshStatus: fetchStatus,
  };
}
