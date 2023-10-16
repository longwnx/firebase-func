import mongoose, {Document, Schema} from "mongoose";

export interface SettingData extends Document {
  appKey: string;
  appName: string;
  appIcon: string;
  tenantId: string | null;
  language: string | null;
  version: number;
  deleteAccountRequestReceiver: string;
  l2sp: {
    enabled: boolean;
  };
  allowGuestCheckout: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const settingSchema = new Schema<SettingData>(
  {
    appKey: {type: String, required: true},
    appName: {type: String, required: true},
    appIcon: {type: String, required: true},
    tenantId: {type: String, default: null},
    language: {type: String, default: null},
    version: {type: Number, required: true},
    deleteAccountRequestReceiver: {type: String, required: true},
    l2sp: {
      enabled: {type: Boolean, required: true},
    },
    allowGuestCheckout: {type: Boolean, required: true},
  },
  {timestamps: true},
);

export default mongoose.model<SettingData>("Setting", settingSchema);
