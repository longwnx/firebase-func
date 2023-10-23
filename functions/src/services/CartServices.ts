import {Request, Response} from "express";
import Database from "../db";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import {Collection, ObjectId, UpdateFilter} from "mongodb";

export const handleAddItemCartRequest = async (req: Request, res: Response) => {
  try {
    const db = Database.db;
    const collection: Collection = db?.collection("Cart") as Collection;
    const {userId, lineItems} = req.body;
    const deviceId = req.headers.deviceid;

    if (!deviceId) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({error: "Invalid request, deviceId is missing"});
    }

    const result = await collection.insertOne({
      userId,
      deviceId,
      lineItems,
    });

    if (result.insertedId) {
      const data = await collection.findOne({_id: result.insertedId});

      if (data) {
        return res.status(HttpStatusCodes.CREATED).json({
          message: "New cart created and saved with userId",
          data: {cartId: data?._id, ...data},
        });
      } else {
        return res
          .status(HttpStatusCodes.NOT_FOUND)
          .json({error: "Data retrieval error"});
      }
    } else {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({error: "Insertion error"});
    }
  } catch (error) {
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({error: "An error occurred while processing the request"});
  }
};

export const handleUpdateCartRequest = async (req: Request, res: Response) => {
  try {
    const db = Database.db;
    const collection: Collection = db?.collection("Cart") as Collection;
    const {lineItems} = req.body;
    const {cartId} = req.params;

    if (!cartId) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({error: "Invalid request, cartId is missing"});
    }

    const existingProduct = await collection.findOne({
      "_id": new ObjectId(cartId),
      "lineItems.productId": lineItems[0].productId,
    });

    let result;

    if (existingProduct) {
      result = await collection.findOneAndUpdate(
        {
          "_id": new ObjectId(cartId),
          "lineItems.productId": lineItems[0].productId,
        },
        {$inc: {"lineItems.$.quantity": lineItems[0].quantity}},
        {returnDocument: "after"},
      );
    } else {
      result = await collection.findOneAndUpdate(
        {_id: new ObjectId(cartId)},
        {$push: {lineItems: lineItems[0]}},
        {returnDocument: "after"},
      );
    }

    if (result) {
      return res.status(HttpStatusCodes.OK).json({
        message: "Cart updated successfully",
        data: {cartId: result?._id, ...result},
      });
    } else {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({error: "Cart not found or update failed"});
    }
  } catch (error) {
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({error: "An error occurred while processing the request"});
  }
};

export const handleDeleteCartItemRequest = async (
  req: Request,
  res: Response,
) => {
  try {
    const db = Database.db;
    const collection: Collection = db?.collection("Cart") as Collection;
    const {cartId, productId} = req.params;
    const deviceId = req.headers.deviceid;

    if (!deviceId) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({error: "Invalid request, deviceId is missing"});
    }
    const update: UpdateFilter<Document> = {
      $pull: {lineItems: {productId: productId}},
    };
    const result = await collection.findOneAndUpdate(
      {_id: new ObjectId(cartId)},
      update as any,
      {returnDocument: "after"},
    );

    console.log("result", result);

    if (result) {
      return res.status(HttpStatusCodes.OK).json({
        message: "Item removed from the cart",
        data: {cartId: result?._id, ...result},
      });
    } else {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({error: "Cart not found"});
    }
  } catch (error) {
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({error: "An error occurred while processing the request"});
  }
};
