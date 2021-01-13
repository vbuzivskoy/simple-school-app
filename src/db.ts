import { Pool, ClientConfig } from 'pg';

export const initDatabase = (dbConfig: ClientConfig): Pool => {
  const pool = new Pool(dbConfig);
  return pool;
};
