/* eslint-disable require-jsdoc */
import axios from "axios";
import {convertReviewProduct, convertReviewSummary} from "../utils/function";
import {ReviewProduct} from "../models/Review";

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
