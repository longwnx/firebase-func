import express, {Request, Response} from "express";
import {registerCustomer} from "../services/CustomerServices";
import {customerData} from "../models/User";

// eslint-disable-next-line new-cap
const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const customer = req.body as customerData;
    console.log(" req.body", req.body);
    const createdApp = await registerCustomer(customer);
    console.log(" createdApp", createdApp);
    res.json({message: "Đăng kí thành công", data: createdApp});
  } catch (error) {
    res.status(500).json({
      error: error?.toString(),
    });
  }
});
export default router;
