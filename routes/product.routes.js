import { Router } from "express";

import { createProduct } from "../controllers/product/create.product.controller.js";
import { readAllProducts } from "../controllers/product/read.product.controller.js";
import { updateProduct } from "../controllers/product/update.product.controller.js";
import { deleteProduct } from "../controllers/product/delete.product.controller.js";

import { getProductById } from "../controllers/product/read.product.controller.js";
import { getProductsByCategory } from "../controllers/product/read.product.controller.js";


import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

export const productRoutes = Router();

// Rutas Privadas: Solo Admin

productRoutes.post('/api/v1/create-product', isAuthenticated, isAdmin, createProduct);

productRoutes.put('/api/v1/update-product/:id', isAuthenticated, isAdmin, updateProduct);

productRoutes.delete('/api/v1/delete-product/:id', isAuthenticated, isAdmin, deleteProduct);

// Rutas Publicas: Sin necesidad de Registro/Login

productRoutes.get('/api/v1/read-products', readAllProducts);

productRoutes.get('/api/v1/product/:id', getProductById);

productRoutes.get('/api/v1/products-by-category/:categoryId', getProductsByCategory);

