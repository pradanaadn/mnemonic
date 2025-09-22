import { defaults } from 'jest-config';

export default {
  ...defaults,
  testEnvironment: 'node',
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/*.test.ts', '**/*.spec.ts'],
  moduleNameMapper: {
    '^@services(.*)$': '<rootDir>/src/services$1',
    '^@logger$': '<rootDir>/src/libs/helper/logger',
    '^@config$': '<rootDir>/src/config/index',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  roots: ['<rootDir>/src', '<rootDir>/tests'],
};