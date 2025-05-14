import axios from 'axios';
import { config } from '../lib/config';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  Student,
  Teacher,
  Course,
  Grade
} from '../types';

const api = axios.create({
  baseURL: config.api.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', data);
  return response.data;
};

// Students
export const getStudents = async (): Promise<Student[]> => {
  const response = await api.get<Student[]>('/students');
  return response.data;
};

export const getStudent = async (id: number): Promise<Student> => {
  const response = await api.get<Student>(`/students/${id}`);
  return response.data;
};

// Teachers
export const getTeachers = async (): Promise<Teacher[]> => {
  const response = await api.get<Teacher[]>('/teachers');
  return response.data;
};

export const getTeacher = async (id: number): Promise<Teacher> => {
  const response = await api.get<Teacher>(`/teachers/${id}`);
  return response.data;
};

// Courses
export const getCourses = async (): Promise<Course[]> => {
  const response = await api.get<Course[]>('/courses');
  return response.data;
};

export const getCourse = async (id: number): Promise<Course> => {
  const response = await api.get<Course>(`/courses/${id}`);
  return response.data;
};

// Grades
export const getGrades = async (): Promise<Grade[]> => {
  const response = await api.get<Grade[]>('/grades');
  return response.data;
};

export const getStudentGrades = async (studentId: number): Promise<Grade[]> => {
  const response = await api.get<Grade[]>(`/grades/student/${studentId}`);
  return response.data;
}; 