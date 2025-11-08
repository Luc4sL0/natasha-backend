import express from "express";
import {
  getEventsController,
  getEventController,
  postEventController,
  putEventController,
  deleteEventController,
  getCurrentEventsController,
  getUpcomingEventsController,
  getPastEventsController,
  getNextEventController,
  getLocationEventsController,
  getHighlightedEventsController,
  getStatusEventsController,
  getLastEventController,
} from "../controllers/eventController.js";

import { upload } from "../config/multerConfig.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

/**
 * Prefixo aplicado no app principal:
 * app.use("/api/v1", router);
 *
 * Exemplos finais:
 * GET  /api/v1/events
 * GET  /api/v1/events/current
 * GET  /api/v1/events/upcoming
 * GET  /api/v1/events/past
 * GET  /api/v1/event/next
 * GET  /api/v1/event/last
 * GET  /api/v1/events/highlighted
 * GET  /api/v1/events/status/:status
 * GET  /api/v1/events/location/:city
 * GET  /api/v1/event/:id
 * POST /api/v1/event
 * PUT  /api/v1/event/:id
 * DELETE /api/v1/event/:id
 */

// Rotas públicas (leitura)

router.get("/events/", getEventsController);
router.get("/events/current", getCurrentEventsController);
router.get("/events/upcoming", getUpcomingEventsController);
router.get("/events/past", getPastEventsController);
router.get("/event/next", getNextEventController);
router.get("/event/last", getLastEventController);
router.get("/events/highlighted", getHighlightedEventsController);
router.get("/events/status/:status", getStatusEventsController);
router.get("/events/location/:city", getLocationEventsController);
router.get("/event/:id", getEventController);

// Rotas protegidas (escrita) – autenticado e admin

router.post(
  "/event",
  verifyAdmin,
  upload.fields([
    { name: "coverImg", maxCount: 1 },
    { name: "otherImages", maxCount: 5 },
  ]),
  postEventController
);

router.put(
  "/event/:id",
  verifyAdmin,
  upload.fields([
    { name: "coverImg", maxCount: 1 },
    { name: "otherImages", maxCount: 5 },
  ]),
  putEventController
);

router.delete("/event/:id", verifyAdmin, deleteEventController);

export default router;
