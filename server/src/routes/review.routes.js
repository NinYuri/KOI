import { Router } from "express";
import { createReview, updateReviewPublication, getPublishedReviews } from "../controllers/review.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router = Router();

// Crear una reseña
router.post(
    "/",
    authenticateToken,
    createReview
);

// Obtener reseñas publicadas
router.get("/", getPublishedReviews);

// Publicar u ocultar una reseña
router.put(
    '/:id/publish',
    authenticateToken,
    authorizeRole("Admin"),
    updateReviewPublication
);

export default router;