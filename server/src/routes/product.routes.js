import { Router } from "express";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import { uploadProductImage } from "../middlewares/upload.middleware.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router = Router();

// Ruta pública
router.get("/", getProducts);

// Rutas protegidas: solo Admin
router.post(
    "/",
    authenticateToken,
    authorizeRole("Admin"),
    uploadProductImage.single("image"),
    createProduct
);

router.put(
    "/:id",
    authenticateToken,
    authorizeRole("Admin"),
    uploadProductImage.single("image"),
    updateProduct
);

router.delete(
    "/:id",
    authenticateToken,
    authorizeRole("Admin"), 
    deleteProduct
);

export default router;