enum sex {
  Male,
  Female,
}

enum subject {
  Biology,
  Math,
  Physics,
  Chemistry,
}

interface Teacher {
  id: string;
  fullName: string;
  age: number;
  sex: sex;
  yearsOfExperience: number;
  canTeachSubjects: subject[];
}

interface Lesson {
  id: string;
  subject: subject;
  teacherId: string;
  classroomId: string;
  datetime: Date;
}

interface Classroom {
  id: string;
  classroomNumber: string;
}
