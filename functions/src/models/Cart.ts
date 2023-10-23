import mongoose, {Schema} from "mongoose";

const cartItemSchema: Schema = new Schema({
  productId: {type: Number, required: true},
  variation_id: {type: Number, required: false},
  quantity: {type: Number, required: true},
});

const CartModel: Schema = new Schema({
  cartId: {type: String, required: true},
  userId: {type: String, required: true},
  lineItems: [cartItemSchema],
});

export default mongoose.model<Cart>("Cart", CartModel);
