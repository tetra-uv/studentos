/**
 * Repository Pattern Interfaces
 * 
 * Defines standard CRUD operations for domain models.
 * Allows swapping the underlying storage provider (Local, IndexedDB, Supabase, etc.)
 * without changing the business logic.
 */

import type { BaseEntity } from "../domain/models";

export interface IRepository<T extends BaseEntity> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  findBy(predicate: Partial<T>): Promise<T[]>;
  
  save(entity: T): Promise<T>;
  saveMany(entities: T[]): Promise<T[]>;
  
  delete(id: string): Promise<void>;
  
  // Sync-specific operations
  getPendingSync(): Promise<T[]>;
  markAsSynced(ids: string[]): Promise<void>;
}

export abstract class LocalRepository<T extends BaseEntity> implements IRepository<T> {
  abstract findById(id: string): Promise<T | null>;
  abstract findAll(): Promise<T[]>;
  abstract findBy(predicate: Partial<T>): Promise<T[]>;
  abstract save(entity: T): Promise<T>;
  abstract saveMany(entities: T[]): Promise<T[]>;
  abstract delete(id: string): Promise<void>;
  abstract getPendingSync(): Promise<T[]>;
  abstract markAsSynced(ids: string[]): Promise<void>;
}

// Placeholder for future IndexedDB implementation
export interface IndexedDbRepository<T extends BaseEntity> extends IRepository<T> {}

// Placeholder for future Supabase implementation
export interface SupabaseRepository<T extends BaseEntity> extends IRepository<T> {}

// Placeholder for future PostgreSQL backend implementation
export interface PostgreSqlRepository<T extends BaseEntity> extends IRepository<T> {}
