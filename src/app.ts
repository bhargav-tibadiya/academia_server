// Packages
import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";


// Router
import RootRouter from '@routes/root.routes'


// Utils & Config
import { connect } from "@config/db";
import { rateLimiterConfig } from "@utils/constants/config";
import { ROUTES } from "@utils/constants/routes";


// Setup Environment
dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 5000;


// DB Connection
connect()


// Rate Limiter
const limiter = rateLimit(rateLimiterConfig);


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(limiter)


// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the TypeScript Node.js backend!");
});

app.use(ROUTES.BASE, RootRouter);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});