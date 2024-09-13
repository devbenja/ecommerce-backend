import { Router } from "express";
import { createCategory } from "../controllers/category/create.category.controller.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware.js";

export const categoryRoutes = Router();

categoryRoutes.post('/api/v1/create-category', isAuthenticated, isAdmin, createCategory);

