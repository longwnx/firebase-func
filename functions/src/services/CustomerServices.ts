/* eslint-disable require-jsdoc */
import Database from "../db";
import axios from "axios";
import {customerData, userData} from "../models/User";

export async function registerCustomer(data: customerData) {
  try {
    const db = Database.db;
    const collection = db?.collection("User");
    if (collection) {
      const existingUser = await collection.findOne({
        phone: data.billing.phone,
      });

      if (existingUser) {
        throw new Error("Số điện thoại đã được đăng kí");
      }

      try {
        const {data: user} = await axios.post(
          `${process.env.URL}/wp-json/wc/v3/customers`,
          {...data},
          {
            params: {
              consumer_key: process.env.CONSUMER_KEY,
              consumer_secret: process.env.CONSUMER_SECRET,
            },
          },
        );
        if (user) {
          return await collection.insertOne({
            woocommerceId: user.id,
            phone: data.billing.phone,
            username: user.username,
          });
        } else {
          throw Error("Không kết nối được đến cơ sở dữ liệu");
        }
      } catch (error: any) {
        throw error?.response?.data?.message?.toString();
      }
    } else {
      throw new Error("Không kết nối được đến cơ sở dữ liệu");
    }
  } catch (error: any) {
    throw error?.toString();
  }
}

export async function customerLogin(phone: string) {
  try {
    const db = Database.db;
    const collection = db?.collection("User");
    if (collection) {
      const result = (await collection.findOne({phone})) as userData;
      if (result) {
        const id = result.woocommerceId;
        try {
          const {data} = await axios.get(
            `${process.env.URL}/wp-json/wc/v3/customers/${id}`,
            {
              params: {
                consumer_key: process.env.CONSUMER_KEY,
                consumer_secret: process.env.CONSUMER_SECRET,
              },
            },
          );
          if (data) {
            return data;
          } else {
            throw new Error("Người dùng không tồn tại");
          }
        } catch (error: any) {
          throw error?.response?.data?.message?.toString();
        }
      }
      {
        throw new Error("Không kết nối được đến cơ sở dữ liệu");
      }
    } else {
      throw new Error("Không kết nối được đến cơ sở dữ liệu");
    }
  } catch (error: any) {
    throw error?.toString();
  }
}
