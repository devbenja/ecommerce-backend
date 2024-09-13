import { Router } from "express";
import { register } from "../controllers/auth/register.controller.js";
import { login } from "../controllers/auth/login.controller.js";
import { logout } from "../controllers/auth/logout.controller.js";

export const authRoutes = Router();

authRoutes.post('/api/v1/register', register);

authRoutes.post('/api/v1/login', login);

authRoutes.post('/api/v1/logout', logout);