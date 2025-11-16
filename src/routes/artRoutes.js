import express from "express";
import {
  getArtsController,
  getArtByIdController,
  getArtByCategoryController,
  getFeaturedArtController,
  postArtController,
  putArtController,
  deleteArtController,
  getRandomArtController
} from "../controllers/artController.js";

import { upload } from "../config/multerConfig.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";


const router = express.Router();

router.post(
  "/art",
  verifyAdmin,
  upload.fields([
    {name: "mainImgUrl", maxCount: 1}, 
    {name: "othersImages", maxCount: 5 }]),
  postArtController
);

router.put(
  "/art/:id/",
  verifyAdmin, 
  upload.fields([
    {name: "mainImgUrl", maxCount: 1}, 
    {name: "othersImages", maxCount: 5 }]),
  putArtController
);

router.delete("/art/:id", verifyAdmin, deleteArtController);

router.get("/arts", getArtsController);
router.get("/arts/category/:category", getArtByCategoryController);
router.get("/arts/featured", getFeaturedArtController);
router.get("/art/random", getRandomArtController);
router.get("/art/:id", getArtByIdController);

export default router;