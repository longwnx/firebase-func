import axios from "axios";
import {WooCommerceProduct} from "../models/Product";
import {ConvertProduct} from "../utils/function";

// eslint-disable-next-line require-jsdoc
export async function getListProduct(ids?: number[]) {
  try {
    const products = await axios.get(
      "https://bangshop.io.vn/wp-json/wc/v3/products",
      {
        params: {
          consumer_key: "ck_3000bd7d06a3c8009fe9858ab0646cfbe77b152e",
          consumer_secret: "cs_18bd91895b7442837e0713825fc0c1a04d441251",
          ids: ids,
        },
        headers: {},
      },
    );

    if (products.data) {
      const listProduct = products.data as WooCommerceProduct[];
      return {
        appKey: null,
        query: null,
        // eslint-disable-next-line new-cap
        products: ConvertProduct(listProduct),
      };
    } else {
      throw new Error("Setting not found");
    }
  } catch (error) {
    throw new Error("An error occurred while processing the request");
  }
}
