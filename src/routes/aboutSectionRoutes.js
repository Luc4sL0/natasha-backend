import express from "express";
import { upload } from "../config/multerConfig.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { getAboutSectionController, putAboutSectionController } from "../controllers/aboutSectionController.js";

const router = express.Router();


router.get("/sections/about/:id", getAboutSectionController);


router.put(
  "/sections/about/:id",
  verifyAdmin,
  upload.fields([
    { name: "coverImg", maxCount: 1 },
  ]),
  putAboutSectionController
);


export default router;
