export interface Migration {
  readonly version: number;
  readonly up: string[];
  readonly down: string[];
}

export const MIGRATIONS: readonly Migration[] = [];
