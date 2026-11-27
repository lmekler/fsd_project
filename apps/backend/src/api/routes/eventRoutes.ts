import { Router } from "express";
import { eventController } from "../controllers/eventController";
import {
  validateEventBody,
  validateEventId,
} from "../validations/eventValidation";

export const eventRoutes = Router();

eventRoutes.get("/", eventController.getAll);

eventRoutes.get("/:id", validateEventId, eventController.getById);

eventRoutes.post("/", validateEventBody, eventController.add);

eventRoutes.delete("/:id", validateEventId, eventController.remove);
