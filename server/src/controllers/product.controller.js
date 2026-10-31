import { prisma } from "../config/prisma.js";

// GET: Obtener productos por categoría y página
export const getProducts = async (req, res) => {
    try {
        const category = req.query.category || "Entradas";
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);

        const products = await prisma.$queryRaw`
            SELECT * FROM sp_get_products(
                ${category},
                ${page}
            )
        `;

        // La función devuelve una fila especial cuando la categoría no existe
        if (products.length > 0 && products[0].product_id === null) {
            const message = products[0].mensaje;

            if (message?.includes("categoría")) {
                return res.status(404).json({ message });
            }

            return res.status(200).json({
                message,
                products: [],
                hasMore: false,
            });
        }

        const hasMore = products.length > 0
            ? products[0].has_more
            : false;

        return res.status(200).json({
            products,
            hasMore,
            currentPage: page,
        });

    } catch (error) {
        console.error("Error retrieving products:", error);

        return res.status(500).json({
            message: "Error retrieving products",
        });
    }
};


// POST: Crear un producto
export const createProduct = async (req, res) => {
    try {
        const {
            category,
            name,
            description,
            price,
        } = req.body;

        // Validar que se haya enviado una imagen
        if (!req.file) {
            return res.status(400).json({
                message: "Product image is required",
            });
        }

        const imageUrl = req.file.path;

        const result = await prisma.$queryRaw`
            SELECT * FROM sp_create_product(
                ${category},
                ${name},
                ${description},
                ${Number(price)},
                ${imageUrl}
            )
        `;

        const { mensaje, success } = result[0];

        if (!success) {
            return res.status(400).json({ message: mensaje });
        }

        return res.status(201).json({
            message: mensaje,
        });

    } catch (error) {
        console.error("Error creating product:", error);

        return res.status(500).json({
            message: "Error creating product",
        });
    }
};


// PUT: Actualizar un producto
export const updateProduct = async (req, res) => {
    try {
        const productId = Number(req.params.id);

        if (!Number.isInteger(productId) || productId <= 0) {
            return res.status(400).json({
                message: "Invalid product ID",
            });
        }

        const {
            category,
            name,
            description,
            price,
            is_available,
        } = req.body;

        // Si no se envía una imagen, conservamos la actual
        const imageUrl = req.file?.path ?? null;

        const parsedPrice =
            price === undefined || price === ""
                ? null
                : Number(price);

        const parsedAvailability =
            is_available === undefined
                ? null
                : is_available === true || is_available === "true";

        const result = await prisma.$queryRaw`
            SELECT * FROM sp_update_product(
                ${productId},
                CAST(${category ?? null} AS VARCHAR(100)),
                CAST(${name ?? null} AS VARCHAR(100)),
                CAST(${description ?? null} AS VARCHAR(200)),
                CAST(${parsedPrice} AS DECIMAL(10, 2)),
                CAST(${imageUrl} AS VARCHAR(300)),
                CAST(${parsedAvailability} AS BOOLEAN)
            )
        `;

        const { mensaje, success } = result[0];

        if (!success) {
            return res.status(400).json({ message: mensaje });
        }

        return res.status(200).json({
            message: mensaje,
        });

    } catch (error) {
        console.error("Error updating product:", error);

        return res.status(500).json({
            message: "Error updating product",
        });
    }
};


// DELETE: Desactivar un producto (soft delete)
export const deleteProduct = async (req, res) => {
    try {
        const productId = Number(req.params.id);

        if (!Number.isInteger(productId) || productId <= 0) {
            return res.status(400).json({
                message: "Invalid product ID",
            });
        }

        // Reutilizamos sp_update_product para cambiar is_available
        const result = await prisma.$queryRaw`
            SELECT * FROM sp_update_product(
                ${productId},
                CAST(NULL AS VARCHAR(100)),
                CAST(NULL AS VARCHAR(100)),
                CAST(NULL AS VARCHAR(200)),
                CAST(NULL AS DECIMAL(10, 2)),
                CAST(NULL AS VARCHAR(300)),
                FALSE
            )
        `;

        const { mensaje, success } = result[0];

        if (!success) {
            return res.status(400).json({ message: mensaje });
        }

        return res.status(200).json({
            message: "Product successfully deactivated",
            details: mensaje,
        });

    } catch (error) {
        console.error("Error deactivating product:", error);

        return res.status(500).json({
            message: "Error deactivating product",
        });
    }
};