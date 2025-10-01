/* eslint-disable @typescript-eslint/no-explicit-any */
import * as schema from '../../src/db/schemas';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { UserService } from '@services';
import { UserRepository } from '@repositories';
import { PasswordService } from '@services'; // Assuming a concrete implementation exists
import { TokenService } from '@services';
import { UserDataType, LoginDataType } from '@schema';

describe('UserService', () => {
  let db: any;
  let client: any;
  let postgresContainer: any;
  let userService: UserService;
  let userRepository: UserRepository;
  let passwordService: PasswordService;
  let tokenService: TokenService;
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
    passwordService = new PasswordService(); // Assuming concrete implementation
    tokenService = new TokenService();
    userService = new UserService();
  });

  afterEach(async () => {
    await client.end();
    await postgresContainer.stop();
  });

  describe('register', () => {
    it('should register a user successfully', async () => {
      const userData: UserDataType = {
        name: 'Test User',
        username: 'testuser',
        password: 'Password123!',
      };
      const result = await userService.register(userData, userRepository, db);
      expect(result).toHaveProperty('id');
      expect(result.name).toBe('Test User');
      expect(result.username).toBe('testuser');

      // Verify in DB
      const foundUser = await userRepository.findByUsername('testuser', db);
      expect(foundUser).toBeTruthy();
      expect(foundUser!.name).toBe('Test User');
      expect(foundUser!.username).toBe('testuser');
    });

    it('should throw error for invalid user data', async () => {
      const invalidUserData: any = {
        name: '',
        username: '',
        password: '',
      };
      await expect(
        userService.register(invalidUserData, userRepository, db),
      ).rejects.toThrow();
    });

    it('should throw error for weak password', async () => {
      const weakPasswordData: UserDataType = {
        name: 'Test User',
        username: 'testuser',
        password: 'password123', // Missing uppercase and special char
      };
      await expect(
        userService.register(weakPasswordData, userRepository, db),
      ).rejects.toThrow();
    });
  });

  describe('login', () => {
    it('should login a user successfully', async () => {
      // First register a user
      const userData: UserDataType = {
        name: 'Test User',
        username: 'testuser',
        password: 'Password123!',
      };
      await userService.register(userData, userRepository, db);

      const loginData: LoginDataType = {
        username: 'testuser',
        password: 'Password123!',
      };
      const secretKey = 'test-secret-key';
      const expiredTime = 3600;
      const result = await userService.login(
        loginData,
        userRepository,
        db,
        passwordService,
        tokenService,
        secretKey,
        expiredTime,
      );
      expect(result).toHaveProperty('userData');
      expect(result.userData.username).toBe('testuser');
      expect(result).toHaveProperty('token');
      expect(typeof result.token).toBe('string');
    });

    it('should throw error for invalid username', async () => {
      const loginData: LoginDataType = {
        username: 'nonexistent',
        password: 'Password123!',
      };
      const secretKey = 'test-secret-key';
      const expiredTime = 3600;
      await expect(
        userService.login(
          loginData,
          userRepository,
          db,
          passwordService,
          tokenService,
          secretKey,
          expiredTime,
        ),
      ).rejects.toThrow('Invalid username or password');
    });

    it('should throw error for invalid password', async () => {
      // First register a user
      const userData: UserDataType = {
        name: 'Test User',
        username: 'testuser',
        password: 'Password123!',
      };
      await userService.register(userData, userRepository, db);

      const loginData: LoginDataType = {
        username: 'testuser',
        password: 'WrongPassword123!',
      };
      const secretKey = 'test-secret-key';
      const expiredTime = 3600;
      await expect(
        userService.login(
          loginData,
          userRepository,
          db,
          passwordService,
          tokenService,
          secretKey,
          expiredTime,
        ),
      ).rejects.toThrow('Invalid username or password');
    });

    it('should throw error for weak password in login data', async () => {
      const loginData: LoginDataType = {
        username: 'testuser',
        password: 'password123', // Weak password
      };
      const secretKey = 'test-secret-key';
      const expiredTime = 3600;
      await expect(
        userService.login(
          loginData,
          userRepository,
          db,
          passwordService,
          tokenService,
          secretKey,
          expiredTime,
        ),
      ).rejects.toThrow();
    });
  });
});
