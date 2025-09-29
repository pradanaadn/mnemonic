import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { dbConfig } from '@config';

const pool = new Pool({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});
const db = drizzle({ client: pool });
type DB = typeof db;
export { db, pool, DB };
