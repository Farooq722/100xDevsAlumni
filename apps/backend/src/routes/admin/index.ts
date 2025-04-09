import { Router } from "express";
import { adminAuth } from "./authAdminRouter";

export const adminRouter = Router();

adminRouter.use("/auth", adminAuth);
