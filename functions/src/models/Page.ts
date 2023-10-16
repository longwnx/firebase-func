import mongoose, {Schema} from "mongoose";
import {ObjectId} from "mongodb";

interface Image {
  src: string;
  ratio: number;
  width: number;
  height: number;
  thumbnail: string;
  action: {
    type: string;
  };
}

interface Category {
  id: number;
  name: string;
  image: Image;
  manufactureCategory: boolean;
}

interface Block {
  id: string;
  action: {
    type: string;
    category?: Category;
  };
  type: string;
  backgroundColor: string;
  placeholder?: string;
  columns?: number;
  images?: Image[];
  spacing?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
    inner: number;
  };
  categories?: Category[];
}

interface Title {
  text: string;
  visible: boolean;
}

interface Page {
  title: Title;
  backgroundColor: string;
  blocks: Block[];
  id: string;
}

export interface PageLayoutData {
  appKey: string;
  multiplePage: boolean;
  pages: Page[];
  title: Title;
  type: string;
  _id: ObjectId; // ID của mục trong MongoDB
}

const pageLayoutSchema = new Schema<PageLayoutData>(
  {
    appKey: {type: String, required: true},
    multiplePage: Boolean,
    pages: [{type: Schema.Types.Mixed, required: false}],
    title: {type: Schema.Types.Mixed, required: false},
    type: {type: String, required: true},
    _id: {type: ObjectId, required: true},
  },
  {timestamps: true},
);

export const HomeModel = mongoose.model<PageLayoutData>(
  "Page",
  pageLayoutSchema,
);
