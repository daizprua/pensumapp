import { Role, Language } from '@school/config';

export interface User {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  role: Role;
  preferred_language: Language;
  created_at: Date;
}

export interface Student {
  id: number;
  user_id: number;
  full_name_en: string;
  full_name_es: string;
  grade_level: string;
  birth_date: Date;
  guardian_name: string;
  created_at: Date;
}

export interface Teacher {
  id: number;
  user_id: number;
  full_name_en: string;
  full_name_es: string;
  subject_specialty_en: string;
  subject_specialty_es: string;
  created_at: Date;
}

export interface Course {
  id: number;
  name_en: string;
  name_es: string;
  description_en: string;
  description_es: string;
  teacher_id: number;
  grade_level: string;
  created_at: Date;
}

export interface Grade {
  id: number;
  student_id: number;
  course_id: number;
  period: string;
  grade: number;
  created_at: Date;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role: Role;
  preferred_language: Language;
} 