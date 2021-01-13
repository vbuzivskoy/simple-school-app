import { Pool } from 'pg';
import Express from 'express';

import { configureApp, AppConfig } from './config';
import { initDatabase } from './db';

const appConfig: AppConfig = configureApp();
const pool: Pool = initDatabase(appConfig.db);

const app = Express();

app.listen(appConfig.app.port, () => {
  console.log(`App listening on port ${appConfig.app.port}`);
});
