import express, {Request, Response} from "express";
import {
  addLayout,
  addPage,
  addSetting,
  createApp,
  getAppByAppKey,
  getLayoutByAppKey,
  getPagesByAppKey,
  getSettingByAppKey,
} from "../services/AppServices";
import {AppData} from "../models/App";
import {SettingData} from "../models/Setting";
import {LayoutData} from "../models/Layout";
import {PageLayoutData} from "../models/Page";

// eslint-disable-next-line new-cap
const router = express.Router();

// Route POST /create-app
router.post("/v1/create-app", async (req: Request, res: Response) => {
  try {
    const appData = req.body as AppData;
    const createdApp = await createApp(appData);
    res.json({message: "App created successfully", data: createdApp});
  } catch (error) {
    res.status(500).json({
      error: "error",
    });
  }
});

router.get("/v1/get-app/:appKey", async (req: Request, res: Response) => {
  try {
    const appKey = req.params.appKey;
    const app = await getAppByAppKey(appKey);
    if (app) {
      res.json({message: "App found", data: app});
    } else {
      res.status(404).json({message: "App not found"});
    }
  } catch (error) {
    res.status(500).json({
      error: "error",
    });
  }
});

router.post("/v1/setting", async (req: Request, res: Response) => {
  try {
    const settingData = req.body as SettingData;

    const result = await addSetting(settingData);

    if ("error" in result) {
      res.status(500).json({error: result.error});
    } else {
      res.status(201).json({
        message: "Setting added successfully",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while processing the request",
    });
  }
});

router.get("/v1/setting/:appKey", async (req: Request, res: Response) => {
  try {
    const appKey = req.params.appKey;
    const setting = await getSettingByAppKey(appKey);

    if ("error" in setting) {
      res.status(404).json({error: setting._id});
    } else {
      res.status(200).json({message: "Setting found", data: setting});
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while processing the request",
    });
  }
});

router.post("/v1/layout", async (req: Request, res: Response) => {
  try {
    const layoutData = req.body as LayoutData;

    const result = await addLayout(layoutData);

    if ("error" in result) {
      res.status(500).json({error: result.error});
    } else {
      res.status(201).json({
        message: "Setting added successfully",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while processing the request",
    });
  }
});

router.get("/v1/layout/:appKey", async (req: Request, res: Response) => {
  try {
    const appKey = req.params.appKey;
    const layout = await getLayoutByAppKey(appKey);

    if ("error" in layout) {
      res.status(404).json({error: layout._id});
    } else {
      res.status(200).json({
        message: "Get layout successfully",
        data: layout,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while processing the request",
    });
  }
});

router.post("/v1/page", async (req: Request, res: Response) => {
  try {
    const layoutData = req.body as PageLayoutData;

    const result = await addPage(layoutData);

    if ("error" in result) {
      res.status(500).json({error: result.error});
    } else {
      res.status(201).json({
        message: "Page added successfully",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while processing the request",
    });
  }
});

router.get("/v1/pages/:appKey", async (req: Request, res: Response) => {
  try {
    const appKey = req.params.appKey;
    const pages = await getPagesByAppKey(appKey);

    if ("error" in pages) {
      res.status(404).json({error: pages});
    } else {
      res.status(200).json({
        message: "Get pages successfully",
        data: pages,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while processing the request",
    });
  }
});

export default router;
