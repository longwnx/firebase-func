import mongoose, {Document} from "mongoose";

export interface WoocommerceUser {
  id: number;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  username: string;
  billing: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  is_paying_customer: boolean;
  avatar_url: string;
  meta_data: never[];
  _links: {
    self: {
      href: string;
    }[];
    collection: {
      href: string;
    }[];
  };
}

export interface customerData extends Document {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  billing: {
    phone: string;
  };
}

export interface userData extends Document {
  woocommerceId: number;
  phone: string;
}

const userSchema = new mongoose.Schema({
  woocommerceId: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

export default mongoose.model<userData>("User", userSchema);
