import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  api: {
    port: process.env.API_PORT || 4000,
    jwtSecret: process.env.JWT_SECRET || 'your-default-secret-key',
    baseUrl: process.env.API_BASE_URL || 'http://localhost:4000'
  },
  database: {
    url: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/schooldb'
  },
  web: {
    baseUrl: process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000'
  }
} as const;

export const ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
  PARENT: 'parent'
} as const;

export const LANGUAGES = {
  EN: 'en',
  ES: 'es'
} as const;

export type Role = keyof typeof ROLES;
export type Language = keyof typeof LANGUAGES; 