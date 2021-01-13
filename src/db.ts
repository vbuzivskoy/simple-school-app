import { Pool, ClientConfig, QueryResult } from 'pg';

import { Teacher } from './models';

export const initDatabase = (dbConfig: ClientConfig): Pool => {
  const pool = new Pool(dbConfig);
  return pool;
};

export const getAllTeachers = async (pool: Pool): Promise<Teacher[]> => {
  const query: string = 'SELECT * FROM teachers;';
  const result: QueryResult = await pool.query(query);
  return result.rows;
};

export const getTargetMathTeachers = async (pool: Pool): Promise<Teacher[]> => {
  const query: string = `SELECT teachers.* FROM lessons
    JOIN teachers ON lessons.teacher_id = teachers.id
    JOIN teachers_to_subjects ON teachers_to_subjects.teacher_id = teachers.id
    JOIN subjects ON teachers_to_subjects.subject_id = subjects.id
    JOIN classrooms ON lessons.classroom_id = classrooms.id
    WHERE classrooms.classroom_number = 100
      AND subjects.title = 'Math'
      AND years_of_experience > 10
      AND day_of_week = 'Thursday'
      AND start_time BETWEEN '08:30' AND '14:30'
    ORDER BY id ASC;`;
  const result: QueryResult = await pool.query(query);
  return result.rows;
};
