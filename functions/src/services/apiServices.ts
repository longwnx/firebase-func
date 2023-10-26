import axios from "axios/index";
import {Order} from "../models/Order";

interface ApiProps {
  patch: string;
  body: any;
  config: any;
}

export const handleApiServices = async (req: ApiProps) => {
  try {
    const {data} = (await axios.post(
      `${process.env.URL}${req.patch}`,
      {...req.body},
      {
        params: {
          consumer_key: process.env.CONSUMER_KEY,
          consumer_secret: process.env.CONSUMER_SECRET,
          ...req.config,
        },
      },
    )) as { data: Order };
    if (data) {
      return data;
    }
    return null;
  } catch (error: any) {
    throw new Error(error);
  }
};
