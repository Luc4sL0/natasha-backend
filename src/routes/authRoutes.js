import express from "express";
import { changePasswordController, createUserController, getUserController, logoutController } from "../controllers/authController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import multer from "multer";

const router = express.Router();
const upload = multer();
/**
 * Prefixo aplicado no app principal:
 * app.use("/api/v1/auth", router);
 *
 * Exemplos finais:
 * POST  /api/v1/auth/create
 * POST  /api/v1/auth/logout
 * POST  /api/v1/auth/change-password
 * GET  /api/v1/auth/user/:id
 */

router.post("/create", upload.none(), verifyAdmin, createUserController);
router.post("/logout/:id", logoutController);
router.post("/change-password/:id", upload.none(), verifyToken,changePasswordController);
router.get("/user/:id", verifyToken, getUserController);

export default router;
