import axios from "axios";
import {Order} from "../models/Order";
import {convertOrderDetail} from "../utils/function";
import {Request, Response} from "express";
import HttpStatusCodes from "../constants/HttpStatusCodes";

export const getListOrder = async (req: Request, res: Response) => {
  try {
    const customerId = req.query.id as string;
    const {data} = (await axios.get(
      `${process.env.URL}/wp-json/wc/v3/orders`,
      {
        params: {
          consumer_key: process.env.CONSUMER_KEY,
          consumer_secret: process.env.CONSUMER_SECRET,
          customer: customerId,
          per_page: 20,
        },
      },
    )) as { data: Order[] };
    res.status(HttpStatusCodes.OK).json({
      message: "Success!",
      data: data.map((item) => {
        return {
          id: item.id,
          itemsTotal: item.line_items.reduce(
            (total, lineItem) => total + lineItem.quantity,
            0,
          ),
          status: item.status,
          totalIncTax: item.total,
          dateCreated: item.date_created,
          dateModified: item.date_modified,
          defaultCurrencyCode: item.currency,
          customStatus: item.status,
        };
      }),
    });
  } catch (error: any) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error?.toString(),
    });
  }
};

export const getDetailOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id as string;
    const {data} = (await axios.get(
      `${process.env.URL}/wp-json/wc/v3/orders/${orderId}`,
      {
        params: {
          consumer_key: process.env.CONSUMER_KEY,
          consumer_secret: process.env.CONSUMER_SECRET,
        },
      },
    )) as { data: Order };

    if (data) {
      res
        .status(HttpStatusCodes.OK)
        .json({message: "Success!", data: convertOrderDetail(data)});
    } else {
      res.status(HttpStatusCodes.NOT_FOUND).json({message: "Khong có data"});
    }
  } catch (error: any) {
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({message: error?.response.data.message.toString()});
  }
};

export default {getListOrder, getDetailOrder};
