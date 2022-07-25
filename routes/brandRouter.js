import { Router } from "express";
import brandController from "../controllers/brandController.js";
import checkRole from "../middleware/checkRoleMiddleware.js";

const router = new Router;

router.post("/", checkRole("ADMIN"), brandController.create);
router.delete("/", checkRole("ADMIN"), brandController.deleteBrand);
router.get("/", brandController.getAll);


export default router;