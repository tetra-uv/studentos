/**
 * Sync Engine Foundation
 * 
 * Manages the background synchronization between the local IndexedDB
 * and the remote provider (e.g., Supabase) without blocking the UI.
 * Inspired by local-first architectures like Figma and Linear.
 */

export type SyncOperation = 'CREATE' | 'UPDATE' | 'DELETE';

export interface SyncTask {
  id: string;
  entityId: string;
  entityType: string;
  operation: SyncOperation;
  payload: any;
  timestamp: number;
  retryCount: number;
  status: 'pending' | 'processing' | 'failed' | 'completed';
}

export interface ISyncQueue {
  push(task: Omit<SyncTask, 'id' | 'status' | 'retryCount' | 'timestamp'>): Promise<void>;
  peek(): Promise<SyncTask | null>;
  pop(): Promise<SyncTask | null>;
  markFailed(taskId: string, error: Error): Promise<void>;
  getPendingTasks(): Promise<SyncTask[]>;
}

export interface ISyncEngine {
  start(): void;
  stop(): void;
  forceSync(): Promise<void>;
  
  // Event listeners for UI to show sync status (e.g., "Cloud icon spinning")
  onSyncStateChange(callback: (state: 'idle' | 'syncing' | 'error' | 'offline') => void): void;
}

export interface IConflictResolver {
  // Simple Last-Write-Wins (LWW) resolver
  resolve<T>(localEntity: T, remoteEntity: T): T;
}
