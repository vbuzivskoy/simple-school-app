import { studentGroupId } from './const';

enum sex_types {
  Male,
  Female,
}

enum days_of_week {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

export interface subject {
  id: number;
  title: string;
}

export interface Teacher {
  id?: number;
  fullName: string;
  age: number;
  sex: sex_types;
  yearsOfExperience: number;
}

export interface Classroom {
  id: number;
  classroomNumber: string;
}

export interface StudentGroup {
  id: number;
  title: string;
}

export interface Lesson {
  id: number;
  subjectId: number;
  teacherId: number;
  studentsGroupId: number;
  classroomId: number;
  dayOfWeek: days_of_week;
  time: Date;
}
