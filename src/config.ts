import dotenv from 'dotenv';
import { ClientConfig } from 'pg';

export interface AppConfig {
  db: ClientConfig;
  app: { port: number };
}

export const configureApp = (): AppConfig => {
  const result = dotenv.config();

  if (result.error) {
    throw result.error;
  }

  return {
    db: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'postgres',
      port: parseInt(process.env.DB_PORT || '5432'),
    },
    app: { port: parseInt(process.env.APP_PORT || '3000') },
  };
};
