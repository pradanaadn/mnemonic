import { UserRecordType, UserDataType } from '@schema';
import { DB } from '@db';

export interface IUserRepository {
  findById(id: string, db: DB): Promise<UserRecordType | null>;
  // findAll(db: DB): Promise<UserRecordType[]>;
  create(user: UserDataType, db: DB): Promise<UserRecordType>;
  // update(id: string, user: Partial<UserDataType>, db: DB): Promise<UserRecordType | null>;
  // delete(id: string, db: DB): Promise<boolean>;
}
