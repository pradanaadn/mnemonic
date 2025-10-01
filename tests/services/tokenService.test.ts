import { TokenService } from '@services';
import { AuthPayloadType } from '@schema';
import jwt from 'jsonwebtoken';

describe('TokenService', () => {
  const secretKey = 'test-secret-key';
  let tokenService: TokenService;

  beforeEach(() => {
    tokenService = new TokenService();
  });

  describe('generate', () => {
    it('should generate a valid token with positive expiredTime', () => {
      const payload: AuthPayloadType = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Test User',
        username: 'testuser',
      };
      const expiredTime = 3600; // 1 hour
      const token = tokenService.generate(payload, secretKey, expiredTime);
      expect(typeof token).toBe('string');
      const decoded = jwt.verify(token, secretKey) as AuthPayloadType; // Use any to access extra fields
      expect(decoded.id).toBe(payload.id);
      expect(decoded.name).toBe(payload.name);
      expect(decoded.username).toBe(payload.username);
    });

    it('should generate a token with expiredTime = 0 (expires immediately)', () => {
      const payload: AuthPayloadType = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Test User',
        username: 'testuser',
      };
      const expiredTime = 0;
      const token = tokenService.generate(payload, secretKey, expiredTime);
      expect(typeof token).toBe('string');
      // Token with expiredTime=0 is expired immediately, so validation should fail
      expect(() => tokenService.validate(token, secretKey)).toThrow(
        'Token validation error',
      );
    });

    it('should handle negative expiredTime (edge case)', () => {
      const payload: AuthPayloadType = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Test User',
        username: 'testuser',
      };
      const expiredTime = -1;
      // JWT does not throw for negative expiresIn; it may ignore or set no expiry
      expect(() =>
        tokenService.generate(payload, secretKey, expiredTime),
      ).not.toThrow();
      const token = tokenService.generate(payload, secretKey, expiredTime);
      expect(typeof token).toBe('string');
      // Since no expiry, it should validate
      const decoded = tokenService.validate(token, secretKey);
      expect(decoded.id).toBe(payload.id);
      expect(decoded.name).toBe(payload.name);
      expect(decoded.username).toBe(payload.username);
    });
  });

  describe('validate', () => {
    it('should validate a correctly generated token', () => {
      const payload: AuthPayloadType = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Test User',
        username: 'testuser',
      };
      const token = tokenService.generate(payload, secretKey, 3600);
      const decoded = tokenService.validate(token, secretKey);
      expect(decoded.id).toBe(payload.id);
      expect(decoded.name).toBe(payload.name);
      expect(decoded.username).toBe(payload.username);
    });

    it('should throw error for invalid token string', () => {
      const invalidToken = 'invalid.jwt.token';
      expect(() => tokenService.validate(invalidToken, secretKey)).toThrow(
        'Token validation error',
      );
    });

    it('should throw error for expired token', async () => {
      const payload: AuthPayloadType = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Test User',
        username: 'testuser',
      };
      const token = tokenService.generate(payload, secretKey, 1); // 1 second
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds
      expect(() => tokenService.validate(token, secretKey)).toThrow(
        'Token validation error',
      );
    });

    it('should throw error for wrong secret key', () => {
      const payload: AuthPayloadType = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Test User',
        username: 'testuser',
      };
      const token = tokenService.generate(payload, secretKey, 3600);
      const wrongSecret = 'wrong-secret';
      expect(() => tokenService.validate(token, wrongSecret)).toThrow(
        'Token validation error',
      );
    });
  });
});
