export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/*.test.ts', '**/*.spec.ts'],
  moduleNameMapper: {
    '^@logger$': '<rootDir>/src/libs/helper/logger',
    '^@config$': '<rootDir>/src/config/index',
    '^@services$': '<rootDir>/src/services',
    '^@db$': '<rootDir>/src/db/index.ts',
    '^@db/schema$': '<rootDir>/src/db/schemas/index.ts',
    '^@type/(.*)$': '<rootDir>/src/core/types/$1',
    '^@interfaces/(.*)$': '<rootDir>/src/core/interfaces/$1',
    '^@schema$': '<rootDir>/src/core/schema/index.ts',
    '^@repositories$': '<rootDir>/src/repositories/index.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
