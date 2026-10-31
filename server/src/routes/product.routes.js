import { Router } from "express";

import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/product.controller.js";

import { uploadProductImage } from "../middlewares/upload.middleware.js";

const router = Router();

router.get("/", getProducts);

router.post(
    "/",
    uploadProductImage.single("image"),
    createProduct
);

router.put(
    "/:id",
    uploadProductImage.single("image"),
    updateProduct
);

router.delete("/:id", deleteProduct);

export default router;