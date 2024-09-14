import { Router } from "express";
import { createCategory } from "../controllers/category/create.category.controller.js";
import { readAllCategories } from "../controllers/category/read.category.controller.js";
import { updateCategory } from "../controllers/category/update.category.controller.js";
import { deleteCategory } from "../controllers/category/delete.category.controller.js";
import { isAuthenticated, isAdmin } from "../middlewares/auth.middleware.js";

export const categoryRoutes = Router();

categoryRoutes.post('/api/v1/create-category', isAuthenticated, isAdmin, createCategory);

categoryRoutes.get('/api/v1/read-categories', isAuthenticated, isAdmin, readAllCategories);

categoryRoutes.put('/api/v1/edit-category/:id', isAuthenticated, isAdmin, updateCategory);

categoryRoutes.delete('/api/v1/delete-category/:id', isAuthenticated, isAdmin, deleteCategory);

