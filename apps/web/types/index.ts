export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  preferred_language: 'en' | 'es';
}

export interface Student {
  id: number;
  user_id: number;
  full_name: string;
  grade_level: string;
  birth_date: string;
  guardian_name: string;
  email: string;
  username: string;
}

export interface Teacher {
  id: number;
  user_id: number;
  full_name: string;
  subject_specialty: string;
  email: string;
  username: string;
}

export interface Course {
  id: number;
  name: string;
  description: string;
  teacher_name: string;
  grade_level: string;
}

export interface Grade {
  id: number;
  student_name: string;
  course_name: string;
  grade_level: string;
  period: string;
  grade: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  preferred_language: 'en' | 'es';
} 