import {Request, Response} from "express";
import Database from "../db";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import {Collection, ObjectId} from "mongodb";

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

    const result = await collection.findOneAndUpdate(
      {_id: new ObjectId(cartId)},
      {$push: {lineItems: lineItems[0]}},
      {returnDocument: "after"},
    );

    console.log("result", result);

    if (result?.value) {
      return res.status(HttpStatusCodes.OK).json({
        message: "Cart updated successfully",
        data: result.value,
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
    const collection = db?.collection("Cart");
    const {cartId, itemId} = req.params;
    const deviceId = req.headers.deviceid;

    if (!deviceId) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({error: "Invalid request, deviceId is missing"});
    }

    const result = await collection?.findOneAndUpdate(
      {cartId: cartId},
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      {$pull: {carts: {product_id: {$eq: itemId}}}},
    );

    if (result?.value) {
      return res
        .status(HttpStatusCodes.OK)
        .json({message: "Item removed from the cart"});
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
