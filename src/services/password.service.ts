import argon2 from 'argon2';
import logger from '@logger';
import { IPasswordService } from '@interfaces/password.interface';

export class PasswordService implements IPasswordService {
  async hash(password: string): Promise<string> {
    try {
      if (!password || password.trim().length === 0) {
        throw new Error('Password cannot be empty');
      }
      return await argon2.hash(password, {
        type: argon2.argon2id,
      });
    } catch (error) {
      logger.error(`Password hashing failed: ${error}`);
      throw new Error('Failed to hash password');
    }
  }

  async verify(
    hashedPassword: string,
    plainPassword: string,
  ): Promise<boolean> {
    try {
      if (!hashedPassword || hashedPassword.trim().length === 0) {
        throw new Error('Hash cannot be empty');
      }

      if (!plainPassword || plainPassword.trim().length === 0) {
        throw new Error('Password cannot be empty');
      }
      const isValid = await argon2.verify(hashedPassword, plainPassword);
      logger.info('Password verification completed');

      return isValid;
    } catch (error) {
      if (
        error instanceof Error &&
        (error.message === 'Hash cannot be empty' ||
          error.message === 'Password cannot be empty')
      ) {
        logger.error(`Password verification failed: ${error.message}`);
        throw error;
      }
      logger.error(`Password verification failed: ${error}`);
      throw new Error('Failed to verify password');
    }
  }
}
