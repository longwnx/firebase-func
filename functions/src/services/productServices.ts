import axios from "axios";
import {Request, Response} from "express";
import {WooCommerceProduct} from "../models/Product";
import {convertListProduct, convertProduct} from "../utils/function";
import HttpStatusCodes from "../constants/HttpStatusCodes";

export const getProductID = async (req: Request, res: Response) => {
  try {
    const id = req?.query?.productId as unknown as number;
    const {data} = await axios.get(
      `${process.env.URL}/wp-json/wc/v3/products/${id}`,
      {
        params: {
          consumer_key: process.env.CONSUMER_KEY,
          consumer_secret: process.env.CONSUMER_SECRET,
        },
        headers: {},
      },
    );

    if (data) {
      const listProduct = data as WooCommerceProduct;
      res
        .status(HttpStatusCodes.OK)
        .json({message: "Success!", data: convertProduct(listProduct)});
    } else {
      res.status(HttpStatusCodes.NOT_FOUND).json({message: "Khong có data"});
    }
  } catch (error: any) {
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({message: "An error occurred while processing the request"});
  }
};

export const getListProduct = async (req: Request, res: Response) => {
  try {
    const ids = req?.query?.ids as unknown as number[];
    const pageNumber = req.query.pageNumber as unknown as number;
    const pageSize = req.query.pageSize as unknown as number;
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
      res.status(HttpStatusCodes.OK).json({
        message: "Get list products success!",
        data:
          {
            appKey: null,
            query: null,
            products: convertListProduct(listProduct),
          } || [],
      });
    } else {
      res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({message: "Setting not found"});
    }
  } catch (error) {
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({message: "An error occurred while processing the request"});
  }
};
