export type FrontendFramework = 'react';
export type BackendFramework = 'express';
export type DatabaseType = 'sqlite';

export interface StackConfig {
  id: StackId;
  template: 'monolith';
  frontend: FrontendFramework;
  backend: BackendFramework;
  database: DatabaseType;
  saas: boolean;
}

// This ID will let us support multiple combos later, e.g.:
// 'monolith-react-express-sqlite', 'monolith-react-nest-postgres', etc.
export type StackId = 'monolith-react-express-sqlite';

// Central registry of all supported stacks.
// Later we just add more entries here.
export const STACKS: Record<StackId, StackConfig> = {
  'monolith-react-express-sqlite': {
    id: 'monolith-react-express-sqlite',
    template: 'monolith',
    frontend: 'react',
    backend: 'express',
    database: 'sqlite',
    saas: false,
  },
};

// Current default stack for the CLI.
// Later we can choose this based on CLI flags.
export const DEFAULT_STACK: StackConfig = STACKS['monolith-react-express-sqlite'];

export interface StackSelectionInput {
    template?: 'monolith';
    frontend?: FrontendFramework;
    backend?: BackendFramework;
    database?: DatabaseType;
    saas?: boolean;
  }
  
  // For now this is very simple and always returns DEFAULT_STACK,
  // but the shape is ready for more combinations later.
  export function selectStack(input: StackSelectionInput = {}): StackConfig {
    // TODO (future): use input to choose a StackId from STACKS
    return DEFAULT_STACK;
  }