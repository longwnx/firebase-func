import mongoose from "mongoose";
import {userData} from "../types/user";

const userSchema = new mongoose.Schema({
  woocommerceId: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

export const user = mongoose.model<userData>("User", userSchema);
