import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { dbConfig, appConfig } from './src/config';
export default defineConfig({
  out: './drizzle',
  schema: './src/db/schemas',
  dialect: 'postgresql',
  dbCredentials: {
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    ssl:
      appConfig.environment === 'production'
        ? { rejectUnauthorized: false }
        : false,
  },
});
