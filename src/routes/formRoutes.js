import express from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import multer from "multer";
import { getFormController, putFormController } from "../controllers/formController.js";

const router = express.Router();

const upload = multer();
router.get("/form", getFormController);

router.put(
  "/form",
  verifyAdmin,
  upload.none(),
  putFormController
);

export default router;
