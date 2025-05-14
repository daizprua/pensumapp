import express from 'express';
import cors from 'cors';
import { config } from './config';
import { authRouter } from './routes/auth';
import { studentsRouter } from './routes/students';
import { teachersRouter } from './routes/teachers';
import { coursesRouter } from './routes/courses';
import { gradesRouter } from './routes/grades';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRouter);
app.use('/students', studentsRouter);
app.use('/teachers', teachersRouter);
app.use('/courses', coursesRouter);
app.use('/grades', gradesRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const port = config.api.port;

app.listen(port, () => {
  console.log(`🚀 API server running on port ${port}`);
}); 