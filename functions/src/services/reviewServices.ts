/* eslint-disable require-jsdoc */
import axios from "axios";
import {convertReviewProduct, convertReviewSummary} from "../utils/function";
import {ReviewProduct} from "../models/Review";
import {Request, Response} from "express";
import HttpStatusCodes from "../constants/HttpStatusCodes";

export async function getProductReview(id: number) {
  try {
    const productReviews = await axios.get(
      `${process.env.URL}/wp-json/wc/v3/products/reviews`,
      {
        params: {
          consumer_key: process.env.CONSUMER_KEY,
          consumer_secret: process.env.CONSUMER_SECRET,
          product: [id],
        },
        headers: {},
      },
    );

    if (productReviews.data) {
      const reviews = productReviews.data as ReviewProduct[];
      return convertReviewProduct(reviews);
    } else {
      throw new Error("Setting not found");
    }
  } catch (error) {
    throw new Error("An error occurred while processing the request");
  }
}

export async function getProductTop3Review(id: number) {
  try {
    const productReviews = await axios.get(
      `${process.env.URL}/wp-json/wc/v3/products/reviews`,
      {
        params: {
          consumer_key: process.env.CONSUMER_KEY,
          consumer_secret: process.env.CONSUMER_SECRET,
          product: [id],
          per_page: 3,
        },
        headers: {},
      },
    );
    if (productReviews.data) {
      const reviews = productReviews.data as ReviewProduct[];
      return convertReviewProduct(reviews);
    } else {
      throw new Error("Setting not found");
    }
  } catch (error) {
    throw new Error("An error occurred while processing the request");
  }
}

export async function getReviewSummary(id: number) {
  try {
    const productReviews = await axios.get(
      `${process.env.URL}/wp-json/wc/v3/products/reviews`,
      {
        params: {
          consumer_key: process.env.CONSUMER_KEY,
          consumer_secret: process.env.CONSUMER_SECRET,
          product: [id],
        },
        headers: {},
      },
    );
    if (productReviews.data) {
      const reviews = productReviews.data as ReviewProduct[];
      return convertReviewSummary(reviews, id);
    } else {
      throw new Error("Setting not found");
    }
  } catch (error) {
    throw new Error("An error occurred while processing the request");
  }
}

export const createProductReview = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const productReviews = await axios.post(
      `${process.env.URL}/wp-json/wc/v3/products/reviews`,
      data,
      {
        params: {
          consumer_key: process.env.CONSUMER_KEY,
          consumer_secret: process.env.CONSUMER_SECRET,
        },
        headers: {},
      },
    );
    if (data) {
      const review = productReviews as unknown as ReviewProduct;
      res
        .status(HttpStatusCodes.OK)
        .json({message: "Success!", data: review});
    } else {
      res.status(HttpStatusCodes.NOT_FOUND).json({message: "Tạo thất bại"});
    }
  } catch (error) {
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({message: error?.toString()});
  }
};
