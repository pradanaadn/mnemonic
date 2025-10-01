import {
  UserRecordType,
  UserIdentityType,
  UserDataType,
  TokenPayloadType,
  LoginDataType,
} from '@schema';
import { IPasswordService } from '@interfaces/password.interface';
import { ITokenService } from '@interfaces/token.interface';
import { DB } from '@db';

export interface IUserRepository {
  findById(id: string, db: DB): Promise<UserRecordType | null>;
  findByUsername(username: string, db: DB): Promise<UserRecordType | null>;
  // findAll(db: DB): Promise<UserRecordType[]>;
  create(user: UserDataType, db: DB): Promise<UserRecordType>;
  // update(id: string, user: Partial<UserDataType>, db: DB): Promise<UserRecordType | null>;
  // delete(id: string, db: DB): Promise<boolean>;
}

export interface IUserService {
  register(
    user: UserDataType,
    userRepo: IUserRepository,
    db: DB,
  ): Promise<UserIdentityType>;
  login(
    user: LoginDataType,
    userRepo: IUserRepository,
    db: DB,
    passwordService: IPasswordService,
    tokenService: ITokenService,
    secretKey: string,
    expiredTime: number,
  ): Promise<TokenPayloadType>;
}
