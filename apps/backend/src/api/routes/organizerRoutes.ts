import { Router } from "express";
import * as organizerController from "../controllers/organizerController";
import { validateOrganizer, validateOrganizerId } from "../validations/organizerValidation";

const router = Router();

router.get(
    "/",
    organizerController.getAll
)

router.post(
    "/",
    validateOrganizer,
    organizerController.add
);

router.delete(
    "/:organizerId",
    validateOrganizerId,
    organizerController.remove
)

export default router;
