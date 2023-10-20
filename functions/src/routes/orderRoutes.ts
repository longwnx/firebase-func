import express, {Request, Response} from "express";
import {getDetailOrder, getListOrder} from "../services/OrderServices";

// eslint-disable-next-line new-cap
const router = express.Router();

router.get("/list", async (req: Request, res: Response) => {
  try {
    const customerId = req.query.id as string;
    const orders = await getListOrder(customerId);
    res.json({message: "Success!", data: orders});
  } catch (error) {
    res.status(500).json({
      error: error?.toString(),
    });
  }
});

router.get("/get/:id", async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id as string;

    const order = await getDetailOrder(orderId);
    res.json({message: "Success!", data: order});
  } catch (error) {
    res.status(500).json({
      message: error?.toString(),
    });
  }
});
export default router;
