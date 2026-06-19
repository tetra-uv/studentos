/**
 * Storage Layer Abstraction
 * 
 * Sits between Zustand (UI) and the underlying browser storage (IndexedDB).
 * Prepares the application for a local-first sync architecture.
 */

import type { StateStorage } from "zustand/middleware";

export interface IStorageProvider extends StateStorage {
  getItem: (name: string) => string | null | Promise<string | null>;
  setItem: (name: string, value: string) => void | Promise<void>;
  removeItem: (name: string) => void | Promise<void>;
  
  // Extended operations for full database-like capabilities
  clear?: () => void | Promise<void>;
  getAllKeys?: () => string[] | Promise<string[]>;
}

export interface StorageConfig {
  name: string;
  version: number;
  provider: 'localstorage' | 'indexeddb' | 'memory';
}
