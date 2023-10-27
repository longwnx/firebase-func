/* eslint-disable require-jsdoc */
import Database from "../db";
import axios from "axios";
import {formRegister, userData, WoocommerceUser} from "../types/user";
import {convertCustomerUser} from "../utils/function";
import {Request, Response} from "express";
import HttpStatusCodes from "../constants/HttpStatusCodes";

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
            return {
              woocommerceUser: convertCustomerUser(data, result?.phone),
            };
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

export const handleGetAddressListRequest = async (
  req: Request,
  res: Response,
) => {
  try {
    const {id} = req.params;
    const {data} = (await axios.get(
      `${process.env.URL}/wp-json/wc/v3/customers/${id}`,
      {
        params: {
          consumer_key: process.env.CONSUMER_KEY,
          consumer_secret: process.env.CONSUMER_SECRET,
        },
      },
    )) as { data: WoocommerceUser };
    const address = [
      {
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        street1: data.billing.address_1,
        street2: data.billing.address_2,
        city: data.billing.city,
        state: data.billing.state,
        country: data.billing.country,
        phone: data.billing.phone,
        formFields: [
          {
            form: "address",
            code: "address-1",
            type: "text-field",
            name: "Address Line 1",
            displayName: "Địa chỉ",
            sequence: 104,
            required: true,
            customField: false,
            value: data.billing.address_1,
            maxLength: 0,
            instructionalText: "",
            minDateString: null,
            maxDateString: null,
            pickList: null,
            keyValues: null,
          },
          {
            form: "address",
            code: "address-2",
            type: "text-field",
            name: "Address Line 2",
            displayName: "Địa chỉ 2",
            sequence: 105,
            required: false,
            customField: false,
            value: data.billing.address_2,
            maxLength: 0,
            instructionalText: "",
            minDateString: null,
            maxDateString: null,
            pickList: null,
            keyValues: null,
          },
          {
            form: "address",
            code: "suburb-city",
            type: "text-field",
            name: "Suburb/City",
            displayName: "Thành Phố",
            sequence: 106,
            required: true,
            customField: false,
            value: data.billing.city,
            maxLength: 0,
            instructionalText: "",
            minDateString: null,
            maxDateString: null,
            pickList: null,
            keyValues: null,
          },
          {
            form: "address",
            code: "state-province",
            type: "state-list",
            name: "State/Province",
            displayName: "Tỉnh",
            sequence: 107,
            required: true,
            customField: false,
            value: data.billing.state,
            maxLength: 0,
            instructionalText: "",
            minDateString: null,
            maxDateString: null,
            pickList: null,
            keyValues: null,
          },
          {
            form: "address",
            code: "country",
            type: "country-list",
            name: "Country",
            displayName: "Quốc gia",
            sequence: 108,
            required: true,
            customField: false,
            value: data.billing.country,
            maxLength: 0,
            instructionalText: "",
            minDateString: null,
            maxDateString: null,
            pickList: null,
            keyValues: null,
          },
        ],
      },
    ];
    res.status(HttpStatusCodes.OK).json({message: "Success!", data: address});
  } catch (err: any) {
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({message: err?.response.data.message.toString()});
  }
};

export const handleUpdateAddress = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.id;
    const bodyData = req.body;

    const result = {
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      country: "",
    };
    bodyData.info.forEach((item: any) => {
      switch (item.code) {
      case "address-1":
        result.address_1 = item.value;
        break;
      case "address-2":
        result.address_2 = item.value;
        break;
      case "suburb-city":
        result.city = item.value;
        break;
      case "state-province":
        result.state = item.value;
        break;
      case "country":
        result.country = item.value;
        break;
      }
    });
    const {data} = (await axios.put(
      `${process.env.URL}/wp-json/wc/v3/customers/${customerId}`,
      {
        billing: {
          address_1: result.address_1,
          address_2: result.address_2,
          city: result.city,
          state: result.state,
          country: result.country,
        },
        shipping: {
          address_1: result.address_1,
          address_2: result.address_2,
          city: result.city,
          state: result.state,
          country: result.country,
        },
      },
      {
        params: {
          consumer_key: process.env.CONSUMER_KEY,
          consumer_secret: process.env.CONSUMER_SECRET,
        },
      },
    )) as { data: WoocommerceUser };

    res.status(HttpStatusCodes.OK).json({message: "Success!", data: data});
  } catch (error: any) {
    res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({message: error?.response.data.message.toString()});
  }
};
