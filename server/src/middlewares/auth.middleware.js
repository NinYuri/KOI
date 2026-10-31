import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Existencia del header Authorization
    if(!authHeader)
        return res.status(401).json({ message: "Lo siento, se requiere el token de acceso." });

    const token = authHeader.split(" ")[1];

    if(!token)
        return res.status(401).json({ message: "El formato del token es inválido." });

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Guardar información del usuario para los siguientes middlewares
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(403).json({ message: "El token es inválido o ha expirado." });
    }
};