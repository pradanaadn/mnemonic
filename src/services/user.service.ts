import { IUserRepository, IUserService } from '@interfaces/user.interface';
import { IPasswordService } from '@interfaces/password.interface';
import { ITokenService } from '@interfaces/token.interface';
import { UserDataType, UserIdentityType, UserIdentity } from '@schema';
import {
  NewUser,
  LoginDataType,
  LoginData,
  TokenPayloadType,
  TokenPayload,
} from '@schema';
import { DB } from '@db';

export class UserService implements IUserService {
  async register(
    user: UserDataType,
    userRepo: IUserRepository,
    db: DB,
  ): Promise<UserIdentityType> {
    const userData = NewUser.parse(user);
    const createdUser = await userRepo.create(userData, db);
    return UserIdentity.parse({
      id: createdUser.id,
      name: createdUser.name,
      username: createdUser.username,
    });
  }
  async login(
    user: LoginDataType,
    userRepo: IUserRepository,
    db: DB,
    passwordService: IPasswordService,
    tokenService: ITokenService,
    secretKey: string,
    expiredTime: number,
  ): Promise<TokenPayloadType> {
    const userData = LoginData.parse(user);
    const userRecord = await userRepo.findByUsername(userData.username, db);
    if (!userRecord) {
      throw new Error('Invalid username or password');
    }
    const isSuccess = await passwordService.verify(
      userRecord.password,
      user.password,
    );

    if (!isSuccess) {
      throw new Error('Invalid username or password');
    }
    const authPayload = {
      id: userRecord.id,
      name: userRecord.name,
      username: userRecord.username,
    };
    const token = tokenService.generate(authPayload, secretKey, expiredTime);
    return TokenPayload.parse({ userData: authPayload, token: token });
  }
}
