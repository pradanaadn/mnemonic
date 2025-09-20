import 'dotenv/config';

type DbConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

const dbConfig: DbConfig = {
  host: process.env['POSTGRES_HOST'] || 'localhost',
  port: process.env['POSTGRES_PORT']
    ? parseInt(process.env['POSTGRES_PORT'] as string)
    : 5432,
  user: process.env['POSTGRES_USER'] || 'user',
  password: process.env['POSTGRES_PASSWORD'] || 'password',
  database: process.env['POSTGRES_DB'] || 'database',
};

console.log('Database Configuration:', dbConfig); // Debugging line to check values

export default dbConfig;
