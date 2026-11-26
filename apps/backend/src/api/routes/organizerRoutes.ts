import { Router } from "express";
import { validateRequest } from "../middleware/validate";
import * as organizerController from "../controllers/organizerController";
import { organizerSchemas } from "../validations/organizerValidation";

const router = Router();

// GET
router.get(
    "/",
    validateRequest(organizerSchemas.getByUser),
    organizerController.getAllByUser
)

// POST
router.post(
    "/",
    validateRequest(organizerSchemas.add),
    organizerController.add
);

// DELETE
router.delete(
    "/:organizerId",
    validateRequest(organizerSchemas.remove),
    organizerController.remove
)

export default router;
