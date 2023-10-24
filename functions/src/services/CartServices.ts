import {Request, Response} from "express";
import Database from "../db";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import {Collection, ObjectId, UpdateFilter} from "mongodb";
import axios from "axios";
import {convertCartItemProduct} from "../utils/function";
import {WooCommerceProduct} from "../models/Product";

export const handleGetCartRequest = async (req: Request, res: Response) => {
  try {
    const db = Database.db;
    const collection: Collection = db?.collection("Cart") as Collection;
    const cartId = req.query.cartId as string;

    if (!cartId) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({error: "Invalid request, cartId is missing"});
    }

    const result = await collection.findOne({_id: new ObjectId(cartId)});

    if (result) {
      return res.status(HttpStatusCodes.OK).json({
        message: "Cart retrieved successfully",
        data: {
          id: result._id,
          ...result,
        },
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
export const handleAddItemCartRequest = async (req: Request, res: Response) => {
  try {
    const db = Database.db;
    const collection: Collection = db?.collection("Cart") as Collection;
    const {customerId, lineItems, grandTotal} = req.body;
    const JM360_DEVICE_KEY = req.headers.jm360_device_key;

    if (!JM360_DEVICE_KEY) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({error: "Invalid request, DEVICE_KEY is missing"});
    }

    const productId = lineItems[0].productId;

    try {
      const product = (await axios.get(
        `${process.env.URL}/wp-json/wc/v3/products/${productId}`,
        {
          params: {
            consumer_key: process.env.CONSUMER_KEY,
            consumer_secret: process.env.CONSUMER_SECRET,
          },
          headers: {},
        },
      )) as { data: WooCommerceProduct };
      if (product) {
        const itemsProduct = [
          {...lineItems[0], ...convertCartItemProduct(product.data)},
        ];

        const result = await collection.insertOne({
          customerId,
          JM360_DEVICE_KEY,
          lineItems: itemsProduct,
          grandTotal,
        });

        if (result.insertedId) {
          const data = await collection.findOne({_id: result.insertedId});

          if (data) {
            return res.status(HttpStatusCodes.CREATED).json({
              message: "New cart created and saved with customerId",
              data: {
                id: data?._id,
                ...data,
              },
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
      } else {
        return res
          .status(HttpStatusCodes.NOT_FOUND)
          .json({error: "No products"});
      }
    } catch (error) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({error: "No products"});
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

    const productId = lineItems[0].productId;

    try {
      const product = (await axios.get(
        `${process.env.URL}/wp-json/wc/v3/products/${productId}`,
        {
          params: {
            consumer_key: process.env.CONSUMER_KEY,
            consumer_secret: process.env.CONSUMER_SECRET,
          },
          headers: {},
        },
      )) as { data: WooCommerceProduct };

      if (product) {
        const itemsProduct = [
          {...lineItems[0], ...convertCartItemProduct(product.data)},
        ];
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
            {$push: {lineItems: itemsProduct[0]}},
            {returnDocument: "after"},
          );
        }

        if (result) {
          return res.status(HttpStatusCodes.OK).json({
            message: "Cart updated successfully",
            data: {id: result?._id, ...result},
          });
        } else {
          return res
            .status(HttpStatusCodes.NOT_FOUND)
            .json({error: "Cart not found or update failed"});
        }
      } else {
        return res
          .status(HttpStatusCodes.NOT_FOUND)
          .json({error: "No products"});
      }
    } catch (err) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({message: err});
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
    const JM360_DEVICE_KEY = req.headers.jm360_device_key;

    if (!JM360_DEVICE_KEY) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({error: "Invalid request, JM360_DEVICE_KEY is missing"});
    }
    const update: UpdateFilter<Document> = {
      $pull: {lineItems: {productId: productId}},
    };
    const result = await collection.findOneAndUpdate(
      {_id: new ObjectId(cartId)},
      update as any,
      {returnDocument: "after"},
    );

    if (result) {
      return res.status(HttpStatusCodes.OK).json({
        message: "Item removed from the cart",
        data: {id: result?._id, ...result},
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
