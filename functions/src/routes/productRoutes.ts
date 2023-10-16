import express, {Request, Response} from "express";
import {getListProduct} from "../services/ProductServices";

// eslint-disable-next-line new-cap
const router = express.Router();

// Route POST /create-app
router.get("/products", async (req: Request, res: Response) => {
  try {
    const products = await getListProduct();
    res.json({message: "Get list products success!", data: products || []});
  } catch (error) {
    res.status(500).json({
      error: "error",
    });
  }
});

router.get("/products/ids", async (req: Request, res: Response) => {
  const ids = req.params.ids as unknown as number[];
  try {
    const products = await getListProduct(ids);
    res.json({message: "Get list products success!", data: products || []});
  } catch (error) {
    res.status(500).json({
      error: "error",
    });
  }
});

export default router;
