import { Router } from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

const router = new Router;

router.post("/sign_in", userController.sign_in);
router.post("/sign_up", userController.sign_up);
router.get("/auth", authMiddleware, userController.check);
router.get("/users", checkRoleMiddleware("ADMIN"), userController.allUsers);
router.delete("/users", checkRoleMiddleware("ADMIN"), userController.deleteUser);


export default router;