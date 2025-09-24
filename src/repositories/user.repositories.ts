import { eq } from 'drizzle-orm';

import { IUserRepository } from '@interfaces/user.interface';
import { DB, Users } from '@db';
import { UserDataType, UserRecordType } from '@schema';
import logger from '@logger';

export class UserRepository implements IUserRepository {
  async findById(id: string, db: DB): Promise<UserRecordType | null> {
    try {
      const user = await db
        .select()
        .from(Users)
        .where(eq(Users.id, id))
        .limit(1);
      return user[0] || null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error(
          `Error finding user by ID: ${error instanceof Error ? error.message : String(error)}`,
        );
      }
      throw error;
    }
  }

  async create(user: UserDataType, db: DB): Promise<UserRecordType> {
    try {
      const [newUser] = await db
        .insert(Users)
        .values({
          name: user.name,
          username: user.username,
          password: user.password,
          roleId: user.roleId,
        })
        .returning();
      if (!newUser) {
        throw new Error(
          'Failed to create user: No user returned from database.',
        );
      }
      return newUser;
    } catch (error) {
      logger.error(
        `Error creating user: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw error;
    }
  }
}
