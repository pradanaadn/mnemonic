import { PasswordService } from '@services';
import {
  beforeAll,
  beforeEach,
  afterEach,
  describe,
  expect,
  test,
  jest,
} from '@jest/globals';

describe('PasswordService', () => {
  let passwordService: PasswordService;
  const plainPassword = 'SecureP@ssw0rd!';
  const anotherPassword = 'AnotherSecure123!';
  let hashedPassword: string;

  beforeEach(() => {
    passwordService = new PasswordService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('hash method', () => {
    beforeAll(async () => {
      const tempService = new PasswordService();
      hashedPassword = await tempService.hash(plainPassword);
    });

    test('should hash a password successfully', async () => {
      const result = await passwordService.hash(plainPassword);

      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result).not.toEqual(plainPassword);
      expect(result.length).toBeGreaterThan(0);
    });

    test('should generate different hashes for the same password', async () => {
      const hash1 = await passwordService.hash(plainPassword);
      const hash2 = await passwordService.hash(plainPassword);

      expect(hash1).not.toEqual(hash2);
    });

    test('should handle empty password', async () => {
      await expect(passwordService.hash('')).rejects.toThrow();
    });

    test('should handle null or undefined password', async () => {
      await expect(passwordService.hash(null as never)).rejects.toThrow();
      await expect(passwordService.hash(undefined as never)).rejects.toThrow();
    });

    test('should hash different passwords to different results', async () => {
      const hash1 = await passwordService.hash(plainPassword);
      const hash2 = await passwordService.hash(anotherPassword);

      expect(hash1).not.toEqual(hash2);
    });
  });

  describe('verify method', () => {
    beforeEach(async () => {
      hashedPassword = await passwordService.hash(plainPassword);
    });

    test('should verify a correct password', async () => {
      const isValid = await passwordService.verify(
        hashedPassword,
        plainPassword,
      );
      expect(isValid).toBe(true);
    });

    test('should not verify an incorrect password', async () => {
      const isValid = await passwordService.verify(
        hashedPassword,
        'WrongP@ssw0rd!',
      );
      expect(isValid).toBe(false);
    });

    test('should not verify empty password against valid hash', async () => {
      await expect(passwordService.verify(hashedPassword, '')).rejects.toThrow(
        'Password cannot be empty',
      );
    });

    test('should throw an error for invalid hash format', async () => {
      await expect(
        passwordService.verify('invalidHash', plainPassword),
      ).rejects.toThrow('Failed to verify password');
    });

    test('should throw an error for empty hash', async () => {
      await expect(passwordService.verify('', plainPassword)).rejects.toThrow();
    });

    test('should handle null or undefined inputs gracefully', async () => {
      await expect(
        passwordService.verify(null as never, plainPassword),
      ).rejects.toThrow();

      await expect(
        passwordService.verify(hashedPassword, null as never),
      ).rejects.toThrow();
    });
  });

  describe('integration tests', () => {
    test('should complete full hash and verify cycle', async () => {
      const testPassword = 'TestPassword123!';

      // Hash the password
      const hash = await passwordService.hash(testPassword);
      expect(hash).toBeDefined();

      // Verify with correct password
      const isValidCorrect = await passwordService.verify(hash, testPassword);
      expect(isValidCorrect).toBe(true);

      // Verify with incorrect password
      const isValidIncorrect = await passwordService.verify(
        hash,
        'WrongPassword',
      );
      expect(isValidIncorrect).toBe(false);
    });

    test('should handle multiple passwords independently', async () => {
      const password1 = 'Password1!';
      const password2 = 'Password2!';

      const hash1 = await passwordService.hash(password1);
      const hash2 = await passwordService.hash(password2);

      // Verify correct combinations
      expect(await passwordService.verify(hash1, password1)).toBe(true);
      expect(await passwordService.verify(hash2, password2)).toBe(true);

      // Verify incorrect combinations
      expect(await passwordService.verify(hash1, password2)).toBe(false);
      expect(await passwordService.verify(hash2, password1)).toBe(false);
    });
  });

  describe('edge cases', () => {
    test('should handle very long passwords', async () => {
      const longPassword = 'a'.repeat(1000);
      const hash = await passwordService.hash(longPassword);

      expect(hash).toBeDefined();
      expect(await passwordService.verify(hash, longPassword)).toBe(true);
    });

    test('should handle special characters in passwords', async () => {
      const specialPassword = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const hash = await passwordService.hash(specialPassword);

      expect(hash).toBeDefined();
      expect(await passwordService.verify(hash, specialPassword)).toBe(true);
    });

    test('should handle unicode characters', async () => {
      const unicodePassword = 'пароль123';
      const hash = await passwordService.hash(unicodePassword);

      expect(hash).toBeDefined();
      expect(await passwordService.verify(hash, unicodePassword)).toBe(true);
    });
  });

  describe('performance tests', () => {
    test('should hash password within reasonable time', async () => {
      const startTime = Date.now();
      await passwordService.hash(plainPassword);
      const endTime = Date.now();

      // Should complete within 5 seconds (adjust based on your requirements)
      expect(endTime - startTime).toBeLessThan(5000);
    });

    test('should verify password within reasonable time', async () => {
      const hash = await passwordService.hash(plainPassword);

      const startTime = Date.now();
      await passwordService.verify(hash, plainPassword);
      const endTime = Date.now();

      // Should complete within 5 seconds (adjust based on your requirements)
      expect(endTime - startTime).toBeLessThan(5000);
    });
  });
});
