import { Router } from "express";
import basketController from "../controllers/basketController.js";

const router = new Router;

router.post("/", basketController.create);
router.get("/", basketController.getAll);

export default router;