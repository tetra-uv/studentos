import { get, set, del } from "idb-keyval";
import type { StateStorage } from "zustand/middleware";

/**
 * Common interface for all storage adapters.
 * Aligns with Zustand's StateStorage requirements.
 */
export interface StorageAdapter extends StateStorage {
  getItem: (name: string) => string | null | Promise<string | null>;
  setItem: (name: string, value: string) => void | Promise<void>;
  removeItem: (name: string) => void | Promise<void>;
}

/**
 * LocalStorage Adapter (Current Source of Truth)
 * Synchronous, blocking, 5MB limit. Used for Phase 1.
 */
export const localStorageAdapter: StorageAdapter = {
  getItem: (name) => localStorage.getItem(name),
  setItem: (name, value) => localStorage.setItem(name, value),
  removeItem: (name) => localStorage.removeItem(name),
};

/**
 * IndexedDB Adapter via idb-keyval
 * Asynchronous, non-blocking, huge capacity.
 * Prepares the infrastructure for the Phase 2 migration.
 */
export const indexedDBAdapter: StorageAdapter = {
  getItem: async (name) => {
    return (await get(name)) || null;
  },
  setItem: async (name, value) => {
    await set(name, value);
  },
  removeItem: async (name) => {
    await del(name);
  },
};

/**
 * Future Supabase Adapter (Placeholder)
 * Will handle cloud sync with offline-first capabilities.
 */
export const supabaseAdapter: StorageAdapter = {
  getItem: async (name) => {
    console.warn("Supabase adapter not implemented yet for:", name);
    return null;
  },
  setItem: async (name, value) => {
    console.warn("Supabase adapter not implemented yet for:", name, value);
  },
  removeItem: async (name) => {
    console.warn("Supabase adapter not implemented yet for:", name);
  },
};

/**
 * Migration Adapter (Future Use)
 * Example architecture of how we will seamlessly migrate users.
 * When we are ready to switch the source of truth, we will use this adapter.
 */
export const migrationAdapter: StorageAdapter = {
  getItem: async (name) => {
    // 1. Try to get from the new source of truth (IndexedDB)
    const idbValue = await indexedDBAdapter.getItem(name);
    if (idbValue) return idbValue;

    // 2. If missing, check the old source of truth (localStorage)
    const lsValue = await Promise.resolve(localStorageAdapter.getItem(name));
    if (lsValue && typeof lsValue === "string") {
      // 3. Transparently migrate the data to IndexedDB
      await indexedDBAdapter.setItem(name, lsValue);
      // Optional: clean up old storage
      // localStorageAdapter.removeItem(name);
      return lsValue;
    }

    return null;
  },
  setItem: indexedDBAdapter.setItem,
  removeItem: async (name) => {
    await indexedDBAdapter.removeItem(name);
    await localStorageAdapter.removeItem(name); // Ensure it's cleared everywhere
  },
};

/**
 * Current Active Storage Adapter
 * Maintained as LocalStorage for Phase 1 compatibility.
 * We will switch this to migrationAdapter when ready.
 */
export const activeStorageAdapter: StorageAdapter = localStorageAdapter;
