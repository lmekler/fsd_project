import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import type { Request, Response, NextFunction } from "express";

import corsOptions from "../config/cors";

const app = express();

// Logging
app.use(morgan("combined"));

app.use(express.json());

// CORS
app.use(cors(corsOptions));

// Central error handler
app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  res.status(500).json({
    error: "Unexpected server error",
  });
});

export default app;
