/* eslint-disable @typescript-eslint/no-explicit-any */
import * as schema from '../../src/db/schemas';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { PostgreSqlContainer } from '@testcontainers/postgresql';

describe('PostgreSQL with Drizzle', () => {
  let db: any;
  let client: any;
  jest.setTimeout(60000);

  let postgresContainer;
  beforeEach(async () => {
    postgresContainer = await new PostgreSqlContainer(
      'postgres:17-alpine',
    ).start();
    client = new Client({
      connectionString: postgresContainer.getConnectionUri(),
    });
    await client.connect();
    db = drizzle(client, { schema });
    await migrate(db, { migrationsFolder: './drizzle' });
  });

  afterEach(async () => {
    await client.end();
  });

  it('should have created the expected tables', async () => {
    const result = await db.execute(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name",
    );
    const tableNames = result.rows.map((row: any) => row.table_name);
    expect(tableNames).toEqual(
      expect.arrayContaining(['users', 'roles', 'notes', 'tags', 'notes_tags']),
    );
  });
});
