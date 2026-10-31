import { prisma } from "../config/prisma.js";

// POST: Crear una reseña
export const createReview = async (req, res) => {
    try {
        const { comment, rating } = req.body;
        const clientId = req.user.clientId;

        const result = await prisma.$queryRaw`
            SELECT * FROM sp_create_review(
                ${clientId},
                ${comment},
                ${rating}
            );
        `;

        const review = result[0];

        if(!review.success)
            return res.status(400).json({ message: review.mensaje });

        return res.status(201).json({ message: review.mensaje });
    } catch (error) {
        console.error('Error al crear la reseña:', error);
        return res.status(500).json({ message: 'Ocurrió un error al crear la reseña.' });
    }
};


// PUT: Publicar u ocultar una reseña
export const updateReviewPublication = async (req, res) => {
    try {
        const reviewId = Number(req.params.id);
        const { isPublished } = req.body;
        const adminId = req.user.clientId;

        const result = await prisma.$queryRaw`
            SELECT * FROM sp_post_review(
                ${adminId},
                ${reviewId},
                ${isPublished}
            );
        `;

        const review = result[0];

        if(!review.success)
            return res.status(400).json({ message: review.mensaje });

        return res.status(200).json({ message: review.mensaje });
    } catch (error) {
        console.error('Error al actualizar la reseña:', error);
        return res.status(500).json({ message: 'Ocurrió un error al actualizar la reseña.' });
    }
};


// GET: Obtener las reseñas publicadas
export const getPublishedReviews = async (req, res) => {
    try {
        const reviews = await prisma.$queryRaw`
            SELECT * FROM sp_get_published_reviews();
        `;

        return res.status(200).json(reviews);
    } catch (error) {
        console.error("Error al obtener las reseñas: ", error);
        return res.status(500).json({ message: "Error al obtener las reseñas." });
    }
};