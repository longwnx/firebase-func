import express from "express";
import {
  addLayout,
  addPage,
  addSetting,
  createApp,
  getAppByAppKey,
  getLayoutByAppKey,
  getLayoutById,
  getPagesByAppKey,
  getSettingByAppKey,
} from "../services/appServices";

const router = express.Router();

// Route POST /create-app
router.post("/v1/create-app", createApp);

router.get("/v1/get-app/:appKey", getAppByAppKey);

router.post("/setting", addSetting);

router.get("/setting/:appKey", getSettingByAppKey);

router.post("/layout", addLayout);

router.get("/:appKey/layout", getLayoutByAppKey);

router.post("/page", addPage);

router.get("/:appKey/pages", getPagesByAppKey);

router.get("/:id/layoutId", getLayoutById);

router.get("/", (req, res) => {
  // This will respond to "/app-mobile/v1/"
  res.send("Welcome to app-mobile version 1");
});

export default router;
