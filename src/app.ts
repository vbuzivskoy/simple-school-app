import { Pool } from 'pg';
import express, { Request, Response } from 'express';

import { configureApp, AppConfig } from './config';
import * as db from './db';
import * as models from './models';

const appConfig: AppConfig = configureApp();
const pool: Pool = db.initDatabase(appConfig.db);

const app = express();
app.use(express.json());

app.get('/teachers', (req: Request, res: Response) => {
  db.getAllTeachers(pool)
    .then((teachers: models.Teacher[]) => res.status(200).json(teachers))
    .catch((e) => res.status(500).json({ message: 'Internal Server error' }));
});

app.get('/teachers/:id', (req: Request, res: Response) => {
  db.getTeacherById(pool, parseInt(req.params.id))
    .then((teacher: models.Teacher) => res.status(200).json(teacher))
    .catch((e) => res.status(500).json({ message: 'Internal Server error' }));
});

app.post('/teachers', (req: Request, res: Response) => {
  const teacher: models.Teacher = req.body;
  console.log(req.body);
  db.createTeacher(pool, teacher)
    .then((id) => res.status(201).json({ message: 'Teacher was created', id }))
    .catch((e) => res.status(400).json({ message: `Teacher wasn't created` }));
});

app.delete('/teachers/:id', (req: Request, res: Response) => {
  db.deleteTeacher(pool, parseInt(req.params.id))
    .then((isTeacherDeleted) => {
      if (isTeacherDeleted) {
        res.status(200).json({ message: 'Teacher was deleted' });
      } else {
        res.status(404).json({ message: 'Teacher was not found' });
      }
    })
    .catch((e) => res.status(405).json({ message: `Teacher wasn't deleted` }));
});

app.put('/teachers/:id', (req: Request, res: Response) => {
  const teacher: models.Teacher = { ...req.body, id: parseInt(req.params.id) };
  db.updateTeacher(pool, teacher)
    .then((isTeacherUpdated) => {
      if (isTeacherUpdated) {
        res.status(200).json({ message: 'Teacher was updated' });
      } else {
        res.status(404).json({ message: 'Teacher was not found' });
      }
    })
    .catch((e) => res.status(405).json({ message: `Teacher wasn't updated` }));
});

app.listen(appConfig.app.port, () => {
  console.log(`App listening on port ${appConfig.app.port}`);
});
