// Packages
import express, { Application, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";


// Setup Environment
dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());
app.use(cookieParser());


// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the TypeScript Node.js backend!");
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});