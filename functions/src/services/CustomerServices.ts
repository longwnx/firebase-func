/* eslint-disable require-jsdoc */
import Database from "../db";
import axios from "axios";
import {customerData} from "../models/User";

export async function registerCustomer(data: customerData) {
  try {
    const db = Database.db;
    const collection = db?.collection("User");
    console.log(" process.env.URL", data);
    if (collection) {
      const existingUser = await collection.findOne({
        phone: data.billing.phone,
      });

      if (existingUser) {
        throw new Error("Số điện thoại đã được đăng kí");
      }

      try {
        const {
          request,
          status,
          data: resData,
          headers,
          statusText,
        } = await axios.post(`${process.env.URL}/wp-json/wc/v3/customers`, {
          params: {
            consumer_key: process.env.CONSUMER_KEY,
            consumer_secret: process.env.CONSUMER_SECRET,
          },
          headers: {},
          data: {
            ...data,
            billing: {
              ...data.billing,
              email: data.email,
            },
          },
        });
        console.log(" user", request, status, resData, headers, statusText);
        // if (user) {
        //   return await collection.insertOne({
        //     woocommerceId: user.id,
        //     phone: data.billing.phone,
        //   });
        // } else {
        //   console.log("user", user);
        //   throw Error("Không kết nối được đến cơ sở dữ liệu");
        // }
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        console.log(":ss", error?.response);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        throw new Error(error?.response?.data?.message?.toString());
      }
    } else {
      throw new Error("Không kết nối được đến cơ sở dữ liệu");
    }
  } catch (error) {
    throw new Error(error?.toString());
  }
}
