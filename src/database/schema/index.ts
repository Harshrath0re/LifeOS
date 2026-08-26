export interface SchemaDefinition {
  readonly tableName: string;
  readonly createTableQuery: string;
}

export const SCHEMAS: readonly SchemaDefinition[] = [];
