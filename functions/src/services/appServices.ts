import {AppData} from "../models/App";
import Database from "../db";
import {InsertOneResult} from "mongodb"; // Import đối tượng cơ sở dữ liệu
import {v4 as uuidv4} from "uuid";
import {SettingData} from "../models/Setting";
import {LayoutData} from "../models/Layout";
import {PageLayoutData} from "../models/Page";

/**
 * Creates an app with the provided data.
 * @param {AppData} data - The data for the app.
 * @return {Promise<InsertOneResult<Document>>} A promise containing the result of the insertion.
 * @throws Will throw an error if there's an issue while saving the data.
 */
export async function createApp(
  data: AppData,
): Promise<InsertOneResult<Document>> {
  try {
    const db = Database.db;
    const collection = db?.collection("App");
    if (collection) {
      const appKey = uuidv4();

      const appDataWithKey = {...data, appKey};
      return await collection.insertOne(appDataWithKey);
    } else {
      throw new Error("Database collection not found");
    }
  } catch (error) {
    throw new Error("An error occurred while saving data");
  }
}

/**
 * Retrieves an app based on the provided appKey.
 * @param {string} appKey - The appKey used to retrieve the app.
 * @return {Promise<Document | null>} A promise containing the retrieved app or null if not found.
 * @throws Will throw an error if there's an issue while retrieving the data.
 */
export async function getAppByAppKey(appKey: string) {
  try {
    const db = Database.db;
    const collection = db?.collection("App");
    return await collection?.findOne({appKey});
  } catch (error) {
    throw new Error("An error occurred while saving data");
  }
}

/**
 * Adds a setting with the provided data.
 * @param {SettingData} data - The data for the setting.
 * @return {Promise<SettingData>} A promise containing the added or updated setting data.
 * @throws Will throw an error if there's an issue while saving the data.
 */
export async function addSetting(data: SettingData): Promise<SettingData> {
  try {
    const db = Database.db;
    const collection = db?.collection("Setting");
    const existingSetting = await collection?.findOne({appKey: data.appKey});

    if (existingSetting) {
      const result = await collection?.replaceOne(
        {
          appKey: data.appKey,
        },
        data,
      );
      if (result?.modifiedCount > 0) {
        return data;
      } else {
        throw new Error("Failed to update setting");
      }
    } else {
      const result = await collection?.insertOne(data);
      if (result) {
        return data;
      } else {
        throw new Error("Failed to add setting");
      }
    }
  } catch (error) {
    throw new Error("An error occurred while saving data");
  }
}

/**
 * Retrieves a setting based on the provided appKey.
 * @param {string} appKey - The appKey used to retrieve the setting.
 * @return {Promise<Document | null>} A promise containing the retrieved setting or null if not found.
 * @throws Will throw an error if there's an issue while processing the request.
 */
export async function getSettingByAppKey(appKey: string) {
  try {
    const db = Database.db;
    const collection = db?.collection("Setting");

    const setting = await collection?.findOne({appKey});

    if (setting) {
      return setting;
    } else {
      throw new Error("Setting not found");
    }
  } catch (error) {
    throw new Error("An error occurred while processing the request");
  }
}

/**
 * Adds a layout with the provided data.
 * @param {LayoutData} data - The data for the layout.
 * @return {Promise<LayoutData>} A promise containing the added or updated layout data.
 * @throws Will throw an error if there's an issue while saving the data.
 */
export async function addLayout(data: LayoutData): Promise<LayoutData> {
  try {
    const db = Database.db;
    const collection = db?.collection("Layout");
    const existingLayout = await collection?.findOne({appKey: data.appKey});

    if (existingLayout) {
      const result = await collection?.replaceOne(
        {
          appKey: data.appKey,
        },
        data,
      );
      if (result?.modifiedCount > 0) {
        return data;
      } else {
        throw new Error("Failed to update layout");
      }
    } else {
      const result = await collection?.insertOne(data);
      if (result) {
        return data;
      } else {
        throw new Error("Failed to add layout");
      }
    }
  } catch (error) {
    throw new Error("An error occurred while saving data");
  }
}

/**
 * Retrieves a layout based on the provided appKey.
 * @param {string} appKey - The appKey used to retrieve the layout.
 * @return {Promise<Document | null>} A promise containing the retrieved layout or null if not found.
 * @throws Will throw an error if there's an issue while processing the request.
 */
export async function getLayoutByAppKey(appKey: string) {
  try {
    const db = Database.db;
    const collection = db?.collection("Layout");

    const setting = await collection?.findOne({appKey});

    if (setting) {
      return setting;
    } else {
      throw new Error("Layout not found");
    }
  } catch (error) {
    throw new Error("An error occurred while processing the request");
  }
}

/**
 * Adds a page with the provided data.
 * @param {PageLayoutData} data - The data for the page layout.
 * @return {Promise<PageLayoutData>} A promise containing the added page layout data.
 * @throws Will throw an error if there's an issue while saving the data.
 */
export async function addPage(data: PageLayoutData) {
  try {
    const db = Database.db;
    const collection = db?.collection("Page");
    const result = await collection?.insertOne(data);
    if (result) {
      return data;
    } else {
      throw new Error("Failed to add layout");
    }
  } catch (error) {
    throw new Error("An error occurred while saving data");
  }
}

/**
 * Retrieves pages based on the provided appKey.
 * @param {string} appKey - The appKey used to retrieve the pages.
 * @return {Promise<Array<Object>>} A promise containing an array of retrieved pages.
 * @throws Will throw an error if there's an issue while processing the request.
 */
export async function getPagesByAppKey(appKey: string) {
  try {
    const db = Database.db;
    const collection = db?.collection("Page");

    const pages = await collection?.find({appKey}).toArray();

    if (pages) {
      return pages.map((page) => {
        return {
          ...page,
          id: page._id,
        };
      });
    } else {
      throw new Error("Setting not found");
    }
  } catch (error) {
    throw new Error("An error occurred while processing the request");
  }
}
