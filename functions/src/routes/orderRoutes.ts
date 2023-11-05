import express from "express";
import {
  getDetailOrder,
  getListOrder,
  handleCreateOrderRequest,
} from "../services/orderServices";
import {
  handleAddItemCartRequest,
  handleCustomerCartRequest,
  handleDeleteCartItemRequest,
  handleGetCartRequest,
  handleUpdateCartRequest,
  handleUpdateQuantityRequest,
} from "../services/cartServices";

const router = express.Router();

router.get("/list", getListOrder);
router.get("/get/:id", getDetailOrder);
router.post("/create", handleCreateOrderRequest);
router.get("/carts", handleGetCartRequest);
router.post("/carts/create", handleAddItemCartRequest);
router.put("/carts/:cartId/items", handleUpdateCartRequest);
router.delete("/carts/:cartId/items/:itemId", handleDeleteCartItemRequest);
router.post("/carts/update/customer", handleCustomerCartRequest);
router.put("/carts/:cartId/items/qty", handleUpdateQuantityRequest);
export default router;
