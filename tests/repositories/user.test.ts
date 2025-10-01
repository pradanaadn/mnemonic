/* eslint-disable @typescript-eslint/no-explicit-any */
import * as schema from '../../src/db/schemas';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { UserRepository } from '@repositories';
import { UserDataType } from '@schema';
import { randomUUID } from 'crypto';

describe('UserRepository - findById', () => {
  let db: any;
  let client: any;
  let postgresContainer: any;
  let userRepository: UserRepository;
  jest.setTimeout(60000);

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
    userRepository = new UserRepository();
  });

  afterEach(async () => {
    await client.end();
    await postgresContainer.stop();
  });

  it('should find an existing user by ID', async () => {
    const userData: UserDataType = {
      name: 'Test User',
      username: 'testuser',
      password: 'password123',
    };
    const createdUser = await userRepository.create(userData, db);
    const foundUser = await userRepository.findById(createdUser.id, db);
    expect(foundUser).toEqual(createdUser);
  });

  it('should return null for a non-existing user ID', async () => {
    const foundUser = await userRepository.findById(randomUUID(), db); // Use a valid UUID that's unlikely to exist
    expect(foundUser).toBeNull();
  });

  it('should find an existing user by Username', async () => {
    const userData: UserDataType = {
      name: 'Test User 2',
      username: 'testuser2',
      password: 'password123',
    };
    const createdUser = await userRepository.create(userData, db);
    const foundUser = await userRepository.findByUsername(
      createdUser.username,
      db,
    );
    expect(foundUser).toEqual(createdUser);
  });
  it('should return null for a non-existing username', async () => {
    const foundUser = await userRepository.findByUsername('RandomUsername', db);
    expect(foundUser).toBeNull();
  });
});
