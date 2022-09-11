import { Router } from "express";
import { createSafeNote, getAllSafeNotes, getSafeNoteById, removeSafeNote } from "../controllers/safeNoteController ";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { validateToken } from "../middlewares/validateTokenMiddleware";
import noteSchema from "../schemas/safeNoteSchema";

const router = Router();

router.post('/safenotes/:userId', validateToken, validateSchemaMiddleware(noteSchema), createSafeNote);
router.get('/safenotes/:userId', validateToken, getAllSafeNotes);
router.get('/safenotes/:id/:userId', validateToken, getSafeNoteById);
router.delete('/safenotes/:id/:userId', validateToken, removeSafeNote);

export default router;