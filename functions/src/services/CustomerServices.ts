/* eslint-disable require-jsdoc */
import Database from "../db";
import axios from "axios";
import {formRegister, userData} from "../types/user";
import {convertCustomerUser} from "../utils/function";

export async function registerCustomer(data: formRegister) {
  try {
    const db = Database.db;
    const collection = db?.collection("User");
    if (collection) {
      const phone = data.info.find((item) => item.code === "phone-number");
      const existingUser = await collection.findOne({
        phone: phone?.value,
      });

      const result = {
        email: "",
        first_name: "",
        last_name: "",
        username: "",
        billing: {
          phone: "",
        },
      };
      data.info.forEach((item) => {
        switch (item.code) {
        case "email-address":
          result.email = item.value;
          break;
        case "phone-number":
          result.billing.phone = item.value;
          break;
        case "first-name":
          result.first_name = item.value;
          break;
        case "last-name":
          result.last_name = item.value;
          break;
        case "user-name":
          result.username = item.value;
          break;
        }
      });

      if (existingUser) {
        throw new Error("Số điện thoại đã được đăng kí");
      }

      try {
        const {data: user} = await axios.post(
          `${process.env.URL}/wp-json/wc/v3/customers`,
          result,
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
            phone: phone?.value,
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
            return {woocommerceUser: convertCustomerUser(data)};
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
