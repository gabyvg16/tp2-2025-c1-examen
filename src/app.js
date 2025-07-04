import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/userRoute.js";

import salesRoutes from "./routes/salesRouter.js";
import cors from "cors";

const app = express();

// Middlewars
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Rutas
app.use("/api/users", userRoutes);

app.use("/api/sales", salesRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.json({
    message: "API TP2 - Examen 2025 C1",
    endpoints: [
      {
        method: "GET",
        path: "/api/sales/:id",
        description: "Obtiene venta dado un id",
      },
      {
        method: "GET",
        path: "/api/sales/total",
        description: "Obtiene ventas con el total de cada una",
      },
      {
        method: "GET",
        path: "/api/sales/customer/:email",
        description: "Obtiene ventas dado un email",
      },
      {
        method: "POST",
        path: "/api/sales/customer/updateCoupon/:id",
        description: "Actualiza el campo coupon de un id",
      },
      {
        method: "GET",
        path: "/api/sales/top-products",
        description: "Top de los productos mas vendidos",
      },
    ],
  });
});

export default app;
