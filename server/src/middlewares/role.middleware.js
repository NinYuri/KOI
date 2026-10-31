export const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req.user)
            return res.status(401).json({ message: "Lo siento, se requiere autenticación." });

        if(!allowedRoles.includes(req.user.role))
            return res.status(403).json({ message: "Lo siento, no tienes permiso para realizar esta acción." });

        next();
    };
};