import { ITokenService } from '@interfaces/token.interface';
import { AuthPayloadType, AuthPayload } from '@schema';
import jwt from 'jsonwebtoken';
import logger from '@logger';

export class TokenService implements ITokenService {
  generate(
    payload: AuthPayloadType,
    secretKey: string,
    expiredTime: number,
  ): string {
    try {
      const userPayload = AuthPayload.parse(payload);
      const option: jwt.SignOptions = {};

      if (expiredTime >= 0) {
        option.expiresIn = expiredTime;
      }

      const token = jwt.sign(userPayload, secretKey, option);
      return token;
    } catch (err) {
      if (err instanceof Error) {
        logger.error(`Token Generations failed:${err.message}`);
      }
      throw Error('Token Generations error');
    }
  }
  validate(token: string, secretKey: string): AuthPayloadType {
    try {
      const decoded = jwt.verify(token, secretKey) as AuthPayloadType;
      return decoded;
    } catch (err) {
      if (err instanceof Error) {
        logger.error(`Token verification failed:${err.message}`);
      }
      throw Error('Token validation error');
    }
  }
}
