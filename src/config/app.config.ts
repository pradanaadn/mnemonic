import 'dotenv/config';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

type AppConfig = {
  environment: Environment;
};
const appConfig: AppConfig = {
  environment:
    (process.env['NODE_ENV'] as Environment) || Environment.Development,
};

export { appConfig, Environment };
