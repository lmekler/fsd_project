import { Router } from "express";
import { eventController } from "../controllers/eventController";

export const eventRoutes = Router();

eventRoutes.get("/", eventController.getAll);

eventRoutes.get("/:id", eventController.getById);

eventRoutes.post("/", eventController.add);

eventRoutes.delete("/:id", eventController.remove);
