import {AppData} from "../models/App";
import Database from "../db";
import {v4 as uuidv4} from "uuid";
import {LayoutData} from "../models/Layout";
import {Request, Response} from "express";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import {SettingData} from "../models/Setting";
import {PageLayoutData} from "../models/Page";
import {ObjectId} from "mongodb";

export const createApp = async (req: Request, res: Response) => {
  try {
    const appData = req.body as AppData;
    const db = Database.db;
    const collection = db?.collection("App");
    if (collection) {
      const appKey = uuidv4();

      const appDataWithKey = {...appData, appKey};

      const result = await collection.insertOne(appDataWithKey);
      if (result) {
        res
          .status(HttpStatusCodes.OK)
          .json({message: "App created successfully", data: result});
      }
      res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({message: "Không connect được database!"});
    }
    res
      .status(HttpStatusCodes.NOT_FOUND)
      .json({message: "Không connect được database!"});
  } catch (error) {
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({message: "An error occurred while processing the request"});
  }
};

export const getAppByAppKey = async (req: Request, res: Response) => {
  try {
    const appKey = req.params.appKey;
    const db = Database.db;
    const collection = db?.collection("App");
    const result = await collection?.findOne({appKey});
    if (result) {
      res
        .status(HttpStatusCodes.OK)
        .json({message: "App found", data: result});
    } else {
      res.status(HttpStatusCodes.NOT_FOUND).json({message: "App not found"});
    }
  } catch (error) {
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({message: "An error occurred while processing the request"});
  }
};

export const addSetting = async (req: Request, res: Response) => {
  try {
    const settingData = req.body as SettingData;
    const db = Database.db;
    const collection = db?.collection("Setting");
    const existingSetting = await collection?.findOne({
      appKey: settingData.appKey,
    });

    if (existingSetting) {
      const result = await collection?.replaceOne(
        {
          appKey: settingData.appKey,
        },
        settingData,
      );
      if (result?.modifiedCount > 0) {
        res.status(HttpStatusCodes.OK).json({
          message: "Setting added successfully",
          data: result,
        });
      } else {
        throw new Error("Failed to update setting");
      }
    } else {
      const result2 = await collection?.insertOne(settingData);
      if (result2) {
        res.status(HttpStatusCodes.CREATED).json({
          message: "Setting added successfully",
          data: result2,
        });
      } else {
        res
          .status(HttpStatusCodes.NOT_FOUND)
          .json({message: "Failed to add setting"});
        // throw new Error("Failed to add setting");
      }
    }
  } catch (error) {
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({message: "An error occurred while processing the request"});
  }
};

export const getSettingByAppKey = async (req: Request, res: Response) => {
  try {
    const appKey = req.params.appKey;
    const db = Database.db;
    const collection = db?.collection("Setting");

    const setting = await collection?.findOne({appKey});

    if (setting) {
      res.status(HttpStatusCodes.OK).json({
        message: "Setting added successfully",
        data: setting,
      });
    } else {
      res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({error: "Setting not found!"});
    }
  } catch (error) {
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({message: "An error occurred while processing the request"});
  }
};

export const addLayout = async (req: Request, res: Response) => {
  try {
    const layoutData = req.body as LayoutData;
    const db = Database.db;
    const collection = db?.collection("Layout");
    const existingLayout = await collection?.findOne({
      appKey: layoutData.appKey,
    });

    if (existingLayout) {
      const result = await collection?.replaceOne(
        {
          appKey: layoutData.appKey,
        },
        layoutData,
      );
      if (result?.modifiedCount > 0) {
        res.status(HttpStatusCodes.CREATED).json({
          message: "Setting added successfully",
          data: result,
        });
      } else {
        res
          .status(HttpStatusCodes.NOT_FOUND)
          .json({error: "Failed updated layout!"});
      }
    } else {
      const result = await collection?.insertOne(layoutData);
      if (result) {
        res.status(HttpStatusCodes.OK).json({
          message: "Setting added successfully",
          data: result,
        });
      }
      res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({error: "Failed updated layout!"});
    }
  } catch (error) {
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({message: "An error occurred while processing the request"});
  }
};

export const getLayoutByAppKey = async (req: Request, res: Response) => {
  try {
    const appKey = req.params.appKey.trim();
    const db = Database.db;
    if (!db) {
      res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({error: "Database connection error"});
    }
    const collection = db?.collection("Layout");

    const setting = await collection?.findOne({appKey});

    if (setting) {
      res.status(HttpStatusCodes.OK).json({
        message: "Get layout successfully",
        data: setting,
      });
    } else {
      res.status(HttpStatusCodes.NOT_FOUND).json({error: "Layout not found"});
    }
  } catch (error) {
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({message: "An error occurred while processing the request"});
  }
};

export const getLayoutById = async (req: Request, res: Response) => {
  try {
    const layoutId = req.params.id.trim(); // Assuming layoutId is the MongoDB ID
    const db = Database.db;

    if (!db) {
      res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json({error: "Database connection error"});
      return;
    }

    const collection = db.collection("Layout");

    // Convert layoutId to ObjectId
    const objectId = new ObjectId(layoutId);

    const layout = await collection.findOne({_id: objectId});

    if (layout) {
      res.status(HttpStatusCodes.OK).json({
        message: "Get layout successfully",
        data: layout,
      });
    } else {
      res.status(HttpStatusCodes.NOT_FOUND).json({error: "Layout not found"});
    }
  } catch (error) {
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({message: "An error occurred while processing the request"});
  }
};

export const addPage = async (req: Request, res: Response) => {
  const layoutData = req.body as PageLayoutData;
  try {
    const db = Database.db;
    const collection = db?.collection("Page");
    const result = await collection?.insertOne(layoutData);
    if (result) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Page added successfully",
        data: layoutData,
      });
    } else {
      res.status(HttpStatusCodes.NOT_FOUND).json({error: "Layout not found"});
    }
  } catch (error) {
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({message: "An error occurred while processing the request"});
  }
};

export const getPagesByAppKey = async (req: Request, res: Response) => {
  try {
    const appKey = req.params.appKey;
    const db = Database.db;
    const collection = db?.collection("Page");

    const pages = await collection?.find({appKey}).toArray();

    if (pages) {
      const appPages = pages.map((page) => {
        return {
          ...page,
          id: page._id,
        };
      });

      res.status(200).json({
        message: "Get pages successfully",
        data: appPages,
      });
    } else {
      res.status(HttpStatusCodes.NOT_FOUND).json({error: "Layout not found"});
    }
  } catch (error) {
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({message: "An error occurred while processing the request"});
  }
};
