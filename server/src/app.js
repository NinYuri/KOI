import express from "express";
import cors from "cors";
import helmet from "helmet";

import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";
import reviewRoutes from "./routes/review.routes.js"

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to KOI API!' });
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);

export default app;