import axios from "axios";
import {Order} from "../models/Order";
import {convertOrderDetail} from "../utils/function";

export const getListOrder = async (customerId: string) => {
  try {
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
    return {
      list: data.map((item) => {
        return {
          id: item.id,
          itemsTotal: item.line_items.reduce(
            (total, lineItem) => total + lineItem.quantity,
            0,
          ),
          status: item.status,
          totalIncTax: item.total_tax,
          dateCreated: item.date_created,
          dateModified: item.date_modified,
          defaultCurrencyCode: item.currency,
          customStatus: item.status,
        };
      }),
    };
  } catch (error: any) {
    throw error?.toString();
  }
};

export const getDetailOrder = async (orderId: string) => {
  try {
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
      return {
        list: convertOrderDetail(data),
      };
    } else {
      throw new Error("Khong có data");
    }
  } catch (error: any) {
    throw error?.response.data.message.toString();
  }
};

export default {getListOrder, getDetailOrder};
