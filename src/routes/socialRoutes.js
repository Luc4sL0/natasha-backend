import express from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { getSocialsController, putSocialsController } from "../controllers/socialController.js";
import multer from "multer";

const router = express.Router();

const upload = multer();

router.get("/socials", getSocialsController);

router.put(
  "/social",
  verifyAdmin,
  upload.none(),
  putSocialsController
);

export default router;
