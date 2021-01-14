CREATE TYPE sex_types AS ENUM ('male', 'female');

CREATE TYPE days_of_week AS ENUM (
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
);

CREATE TABLE subjects (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title varchar(255) NOT NULL
);

CREATE TABLE teachers (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  full_name varchar(255) NOT NULL,
  age integer NOT NULL,
  sex sex_types NOT NULL,
  years_of_experience integer NOT NULL
);

CREATE TABLE teachers_to_subjects (
  teacher_id integer REFERENCES teachers (id) NOT NULL,
  subject_id integer REFERENCES subjects (id) NOT NULL,
  PRIMARY KEY (teacher_id, subject_id)
);

CREATE TABLE classrooms (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  classroom_number integer UNIQUE
);

CREATE TABLE student_groups (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title varchar(10) NOT NULL UNIQUE
);

CREATE TABLE lessons (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  subject_id integer REFERENCES subjects (id) NOT NULL,
  teacher_id integer REFERENCES teachers (id) NOT NULL,
  student_group_id integer REFERENCES student_groups (id) NOT NULL,
  classroom_id integer REFERENCES classrooms (id) NOT NULL,
  day_of_week days_of_week NOT NULL,
  start_time time NOT NULL,
  UNIQUE(teacher_id, day_of_week, start_time),
  UNIQUE(student_group_id, day_of_week, start_time),
  UNIQUE(classroom_id, day_of_week, start_time)
);