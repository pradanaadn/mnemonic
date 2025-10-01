import { AuthPayloadType } from '@schema';

export interface ITokenService {
  generate(
    payload: AuthPayloadType,
    secretKey: string,
    expiredTime: number,
  ): string;
  validate(token: string, secretKey: string): AuthPayloadType;
}
