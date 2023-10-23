import mongoose, {Schema} from "mongoose";

const cartSchema = new Schema<CartItem>({
  quantity: {type: Number, required: true},
  product_id: {type: Number, required: true},
  variation_id: {type: Number, required: false},
});

export default mongoose.model<CartItem>("Cart", cartSchema);
