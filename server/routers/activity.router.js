import express from "express";
const router = express.Router();
import activityController from "../controllers/activity.controller.js";
import { verifyToken, isAdmin, isManager } from "../middleware/authJwt.js";

router.get("/activities", activityController.getAllActivities);
router.get("/activities/:id", verifyToken, activityController.getActivityById);
router.post("/activities", activityController.createActivity);
router.put(
  "/activities/:id",
  verifyToken,
  isManager,
  activityController.updateActivity
);
router.delete(
  "/activities/:id",
  verifyToken,
  isAdmin,
  activityController.deleteActivity
);
router.get(
  "/activities/search",
  verifyToken,
  activityController.searchActivities
);

export default router;
