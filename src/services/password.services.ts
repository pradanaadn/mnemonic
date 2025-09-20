import argon2 from 'argon2';
import logger from '@logger';
export interface IPasswordService {
  hash(password: string): Promise<string>;
  verify(hashedPassword: string, plainPassword: string): Promise<boolean>;
}

export class PasswordService implements IPasswordService {
  async hash(password: string): Promise<string> {
    try {
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
      return await argon2.verify(hashedPassword, plainPassword);
    } catch (error) {
      logger.error(`Password verification failed: ${error}`);
      throw new Error('Failed to verify password');
    }
  }
}
