import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import corsOptions from "../config/cors";
import errorHandler from "./api/middleware/errorHandler";
import savedEventRoutes from "./api/routes/savedEventsRoutes";
import organizerRoutes from "./api/routes/organizerRoutes";

import { eventRoutes } from "./api/routes/eventRoutes";

const app = express();

// Logging
app.use(morgan("combined"));

// CORS
app.use(cors(corsOptions));

// JSON parser
app.use(express.json());

// Routes
app.use("/saved-events", savedEventRoutes);
app.use("/api/organizers", organizerRoutes)

// Central error handler
app.use(errorHandler);

app.use("/api/events", eventRoutes);

export default app;
