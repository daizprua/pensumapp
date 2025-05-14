# School Management System

A bilingual (English/Spanish) school management system built with Next.js and Express.

## Features

- 🌐 Bilingual support (English/Spanish)
- 🔐 JWT-based authentication
- 👥 Role-based access control (Admin, Teacher, Student, Parent)
- 📚 Course management
- 📊 Grade tracking
- 🎓 Student and teacher profiles

## Tech Stack

- **Frontend:**
  - Next.js
  - TypeScript
  - Tailwind CSS
  - next-i18next
  - Axios

- **Backend:**
  - Express.js
  - PostgreSQL
  - JWT
  - bcrypt

## Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd school-management-system
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both `apps/api` and `apps/web`
   - Update the variables with your configuration

4. Set up the database:
   ```sql
   -- Create database
   CREATE DATABASE schooldb;

   -- Run the schema.sql file
   psql -d schooldb -f schema.sql
   ```

5. Start the development servers:
   ```bash
   # Start both frontend and backend
   pnpm dev

   # Or start them separately
   pnpm dev:api
   pnpm dev:web
   ```

## Project Structure

```
school-management-system/
├── apps/
│   ├── api/          # Express.js backend
│   └── web/          # Next.js frontend
├── packages/
│   └── config/       # Shared configuration
└── package.json
```

## API Endpoints

- **Auth:**
  - POST /auth/login
  - POST /auth/register

- **Students:**
  - GET /students
  - GET /students/:id

- **Teachers:**
  - GET /teachers
  - GET /teachers/:id

- **Courses:**
  - GET /courses
  - GET /courses/:id

- **Grades:**
  - GET /grades
  - GET /grades/student/:studentId

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 