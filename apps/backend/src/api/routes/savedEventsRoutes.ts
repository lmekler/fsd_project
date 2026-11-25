import { Router } from "express";
import { validateRequest } from "../middleware/validate";
import * as savedEventsController from "../controllers/savedEventsController";
import { savedEventSchemas } from "../validations/savedEventValidation";

const router = Router();

// GET
router.get(
    "/:userId",
    validateRequest(savedEventSchemas.getByUser),
    savedEventsController.getAllByUser
)

// POST
router.post(
    "/:userId",
    validateRequest(savedEventSchemas.add),
    savedEventsController.add
);

// DELETE
router.delete(
    "/:userId/:savedEventId",
    validateRequest(savedEventSchemas.remove),
    savedEventsController.remove
)

export default router;