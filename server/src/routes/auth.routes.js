import { Router } from "express";
import { register, login, getClients } from "../controllers/auth.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get(
    "/",
    authenticateToken,
    authorizeRole("Admin"),
    getClients
);

export default router;