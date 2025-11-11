import express from "express";
import { changePasswordController, createUserController, getUserController, logoutController } from "../controllers/authController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.post("/create", upload.none(), verifyAdmin, createUserController);
router.post("/logout/:id", logoutController);
router.post("/change-password/:id", upload.none(), verifyToken,changePasswordController);
router.get("/user/:id", verifyToken, getUserController);

export default router;
