import express from "express";
import {getListProduct, getProductID} from "../services/productServices";

const router = express.Router();

// Route POST /create-app
router.get("/products", getListProduct);

router.get("/products/ids", getListProduct);

router.get("/products/details", getProductID);

export default router;
