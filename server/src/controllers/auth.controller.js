import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

// POST: Crear un nuevo usuario
export const register = async(req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            avatarUrl,
            role
        } = req.body;

        const result = await prisma.$queryRaw`
            SELECT * FROM sp_create_client(
                ${firstName},
                ${lastName},
                ${email},
                ${password},
                ${avatarUrl ?? null},
                ${role ?? FALSE}
            )
        `;

        const { mensaje, success } = result[0];

        if(!success)
            return res.status(400).json({ message: mensaje });

        return res.status(201).json({ message: mensaje });
    } catch(error) {
        console.error("Error durante la creación de su cuenta: ", error);
        return res.status(500).json({ message: "Error durante la creación de su cuenta." });
    }
}


// LOGIN 
export const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        const result = await prisma.$queryRaw`
            SELECT * FROM sp_login(
                ${email},
                ${password}
            )
        `;
        
        const { mensaje, success, out_client_id, out_role } = result[0];

        if(!success)
            return res.status(401).json({ message: mensaje });

        // Generar token
        const token = jwt.sign(
            {
                clientId: out_client_id,
                role: out_role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "1h",
            }
        );

        return res.status(200).json({
            message: mensaje,
            token,
            role: out_role,
        });
    } catch(error) {
        console.error("Error durante el inicio de sesión: ", error);
        return res.status(500).json({ message: "Error durante el inicio de sesión." });
    }
}


// GET: Obtener todos los clientes
export const getClients = async (req, res) => {
    try {
        const clients = await prisma.client.findMany({
            select: {
                clientId: true,
                firstName: true,
                lastName: true,
                avatarUrl: true,
                email: true,
                role: true
            },
            orderBy: {
                clientId: "asc"
            }
        });

        return res.status(200).json(clients);
    } catch (error) {
        console.error("Error al obtener los clientes: ", error);
        return res.status(500).json({ message: "Error al obtener los clientes." });
    }
};