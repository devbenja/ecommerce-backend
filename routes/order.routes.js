import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { createOrder } from "../controllers/order/create.order.controller.js";

export const orderRoutes = Router();

orderRoutes.post('/api/v1/create-order', isAuthenticated, createOrder);