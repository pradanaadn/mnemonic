export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/*.test.ts', '**/*.spec.ts'],
  moduleNameMapper: {
    '^@services(.*)$': '<rootDir>/src/services$1',
    '^@logger$': '<rootDir>/src/libs/helper/logger',
    '^@config$': '<rootDir>/src/config/index',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
