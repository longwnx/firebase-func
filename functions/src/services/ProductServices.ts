/* eslint-disable require-jsdoc */
import axios from "axios";
import {WooCommerceProduct} from "../models/Product";
import {convertListProduct, convertProduct} from "../utils/function";

export async function getProductID(id: number) {
  try {
    const products = await axios.get(
      `${process.env.URL}/wp-json/wc/v3/products/${id}`,
      {
        params: {
          consumer_key: process.env.CONSUMER_KEY,
          consumer_secret: process.env.CONSUMER_SECRET,
        },
        headers: {},
      },
    );

    if (products.data) {
      const listProduct = products.data as WooCommerceProduct;
      return convertProduct(listProduct);
    } else {
      throw new Error("Setting not found");
    }
  } catch (error) {
    throw new Error("An error occurred while processing the request");
  }
}

export async function getListProduct(
  ids?: number[],
  pageNumber?: number,
  pageSize?: number,
) {
  try {
    const products = await axios.get(
      `${process.env.URL}/wp-json/wc/v3/products`,
      {
        params: {
          consumer_key: process.env.CONSUMER_KEY,
          consumer_secret: process.env.CONSUMER_SECRET,
          include: ids,
          page: pageNumber,
          per_page: pageSize,
        },
        headers: {},
      },
    );

    if (products.data) {
      const listProduct = products.data as WooCommerceProduct[];
      return {
        appKey: null,
        query: null,
        products: convertListProduct(listProduct),
      };
    } else {
      throw new Error("Setting not found");
    }
  } catch (error) {
    throw new Error("An error occurred while processing the request");
  }
}
