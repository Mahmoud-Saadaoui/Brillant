import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';
import errorHandler from './middlewares/errorHandler.js';
import healthRoutes from './modules/health/health.routes.js';
import authRouter from './modules/auth/auth.routes.js';
import profilesRouter from './modules/profiles/profiles.routes.js';

const app: Express = express();

// Global Middlewares
app.use(helmet());

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Routes
app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/profiles', profilesRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Global Error Handler
app.use(errorHandler);

export default app;
