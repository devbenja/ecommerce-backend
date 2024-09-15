import { Router } from "express";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

import { removeFromCart } from "../controllers/cart/remove.cart.controller.js";
import { addToCart } from "../controllers/cart/add.cart.controller.js";
import { getCart } from "../controllers/cart/list.cart.controller.js";
import { updateCartItem } from "../controllers/cart/update.items.js";

export const cartRoutes = Router();

cartRoutes.post('/api/v1/add-to-cart', isAuthenticated, addToCart);

cartRoutes.get('/api/v1/cart', isAuthenticated, getCart);

cartRoutes.delete('/api/v1/remove-cart-item/:cartItemId', isAuthenticated, removeFromCart);

cartRoutes.put('/api/v1/update-cart-item', isAuthenticated, updateCartItem);

