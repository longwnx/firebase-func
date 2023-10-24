import express from "express";
import {getDetailOrder, getListOrder} from "../services/OrderServices";
import {
  handleAddItemCartRequest,
  handleCustomerCartRequest,
  handleDeleteCartItemRequest,
  handleGetCartRequest,
  handleUpdateCartRequest,
} from "../services/CartServices"; // eslint-disable-next-line new-cap

// eslint-disable-next-line new-cap
const router = express.Router();

router.get("/list", getListOrder);
router.get("/get/:id", getDetailOrder);
router.get("/carts", handleGetCartRequest);
router.post("/carts/create", handleAddItemCartRequest);
router.put("/carts/:cartId/items", handleUpdateCartRequest);
router.delete("/carts/:cartId/items/:productId", handleDeleteCartItemRequest);
router.post("/carts/update/customer", handleCustomerCartRequest);
export default router;
