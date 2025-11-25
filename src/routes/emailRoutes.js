import express from "express";
import { upload } from "../config/multerConfig.js";
import { enviarEmail } from "../controllers/emailController.js";

const router = express.Router();

router.post("/contato", upload.none(), enviarEmail);

export default router;
