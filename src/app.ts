// Packages
import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import cors from "cors";


// Router
import RootRouter from '@routes/root.routes';


// Utils & Config
import { connect } from "@config/db";
import { corsOptions, rateLimiterConfig } from "@utils/constants/config";
import { ROUTES } from "@utils/constants/routes";
import { setupSwagger } from "@utils/swagger";


// Setup Environment
dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 5000;


// DB Connection
connect()


// Rate Limiter
const limiter = rateLimit(rateLimiterConfig);


// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(limiter)
setupSwagger(app);


// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Academia backend \nMay the knowledge Guide your journey!");
});

app.use(ROUTES.BASE, RootRouter);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});