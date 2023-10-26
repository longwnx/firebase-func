import express, {Request, Response} from "express";
import {getListProduct, getProductID} from "../services/productServices";

const router = express.Router();

// Route POST /create-app
router.get("/products", async (req: Request, res: Response) => {
  const pageNumber = req.query.pageNumber as unknown as number;
  const pageSize = req.query.pageSize as unknown as number;
  try {
    const products = await getListProduct(undefined, pageNumber, pageSize);
    res.json({message: "Get list products success!", data: products || []});
  } catch (error) {
    res.status(500).json({
      error: "error",
    });
  }
});

router.get("/products/ids", async (req: Request, res: Response) => {
  const ids = req?.query?.ids as unknown as number[];
  const pageNumber = req.query.pageNumber as unknown as number;
  const pageSize = req.query.pageSize as unknown as number;
  try {
    const products = await getListProduct(ids, pageNumber, pageSize);
    res.json({message: "Get list products success!", data: products || []});
  } catch (error) {
    res.status(500).json({
      error: "error",
    });
  }
});

router.get("/products/details", async (req: Request, res: Response) => {
  const id = req?.query?.productId as unknown as number;
  try {
    const product = await getProductID(id);
    res.json({message: "Get product success!", data: product});
  } catch (error) {
    res.status(500).json({
      error: "error",
    });
  }
});

export default router;
