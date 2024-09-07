import { Router } from "express";
import { register } from "../controllers/auth/register.controller.js";

export const authRouter = Router();

authRouter.post('/api/v1/register', register);