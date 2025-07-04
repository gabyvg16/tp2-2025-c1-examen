import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getAllSales,
  getSaleById,
  getTotalAmountSales,
  getSalesByEmail,
  updateCouponValue,
  topProductBySales,
} from "../controllers/salesController.js";

const router = express.Router();
router.get("/total", authMiddleware, getTotalAmountSales);
router.get("/customer/updateCoupon/:id", authMiddleware, updateCouponValue);
router.get("/customer/:email", authMiddleware, getSalesByEmail);
router.get("/top-products", authMiddleware, topProductBySales);
router.get("/:id", authMiddleware, getSaleById);
router.get("/", getAllSales);

export default router;
