import mongoose, {Document, Schema} from "mongoose";
import {ObjectId} from "mongodb";

export interface AppData extends Document {
  appKey: ObjectId;
  version: number;
  applicationType: number;
  applicationName: string;
  applicationPublished: boolean;
  status: number;
  notificationAppId: string;
  authResourceId: string | null;
  owner: string;
  ownerId: string;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  appDesignPublished: boolean;
  ownerFirstViewed: boolean;
  currency: string;
  _id: ObjectId; // ID của mục trong MongoDB
}

const appSchema = new Schema<AppData>(
  {
    appKey: {type: String, required: true},
    version: {type: Number, required: true},
    applicationType: {type: Number, required: true},
    applicationName: {type: String, required: true},
    applicationPublished: {type: Boolean, required: true},
    status: {type: Number, required: true},
    notificationAppId: {type: String, required: true},
    authResourceId: {type: String, default: null},
    owner: {type: String, required: true},
    ownerId: {type: String, required: true},
    icon: {type: String, required: true},
    createdAt: {type: Date, required: true},
    updatedAt: {type: Date, required: true},
    createdBy: {type: String, required: true},
    appDesignPublished: {type: Boolean, required: true},
    ownerFirstViewed: {type: Boolean, required: true},
    currency: {type: String, required: true},
    _id: {type: String, required: true},
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<AppData>("App", appSchema);
