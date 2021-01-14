import { Pool } from 'pg';
import express, { Request, Response } from 'express';

import { configureApp, AppConfig } from './config';
import {
  initDatabase,
  getAllTeachers,
  getTeacherById,
  createTeacher,
} from './db';
import { Teacher } from './models';

const appConfig: AppConfig = configureApp();
const pool: Pool = initDatabase(appConfig.db);

const app = express();
app.use(express.json());

app.get('/teachers', (req: Request, res: Response) => {
  getAllTeachers(pool)
    .then((teachers: Teacher[]) => res.status(200).json(teachers))
    .catch((e) => res.status(500).json('Internal Server error'));
});

app.get('/teachers/:id', (req: Request, res: Response) => {
  getTeacherById(pool, parseInt(req.params.id))
    .then((teacher: Teacher) => res.status(200).json(teacher))
    .catch((e) => res.status(500).json('Internal Server error'));
});

app.post('/teachers', (req: Request, res: Response) => {
  const teacher: Teacher = req.body;
  console.log(req.body);
  createTeacher(pool, teacher)
    .then((id) => res.status(201).json({ message: 'Teacher was created', id }))
    .catch((e) => res.status(400).json({ message: `Teacher wasn't created` }));
});

app.listen(appConfig.app.port, () => {
  console.log(`App listening on port ${appConfig.app.port}`);
});
