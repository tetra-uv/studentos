/**
 * Schema Versioning and Migrations
 * 
 * Manages local database structure changes over time.
 * Crucial for local-first architectures (IndexedDB) to prevent
 * data loss when upgrading the application.
 */

export interface SchemaMetadata {
  version: number;
  lastMigrationRunAt: number;
}

export interface IMigration {
  version: number;
  description: string;
  
  // Execution logic to move from (version - 1) to (version)
  up: (db: any) => Promise<void>;
  
  // Logic to rollback from (version) to (version - 1)
  down?: (db: any) => Promise<void>;
}

export interface ISchemaManager {
  getCurrentVersion(): Promise<number>;
  getPendingMigrations(): Promise<IMigration[]>;
  runMigrations(): Promise<void>;
}

// Example Schema Definition (V1)
export const SCHEMA_V1 = {
  version: 1,
  stores: {
    student_profiles: { keyPath: 'id' },
    institutions: { keyPath: 'id' },
    semesters: { keyPath: 'id', indices: ['studentId'] },
    sections: { keyPath: 'id', indices: ['semesterId'] },
    sync_queue: { keyPath: 'id', indices: ['status'] },
  }
};
