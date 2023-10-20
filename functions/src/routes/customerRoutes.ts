import express, {Request, Response} from "express";
import {customerLogin, registerCustomer} from "../services/CustomerServices";
import {formRegister} from "../models/User"; // eslint-disable-next-line new-cap

// eslint-disable-next-line new-cap
const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const customer = req.body as formRegister;
    const createdApp = await registerCustomer(customer);
    res.json({message: "Đăng kí thành công", data: createdApp}).status(201);
  } catch (error) {
    res.status(500).json({
      error: error?.toString(),
    });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const phone = req.body.phone as string;
    const user = await customerLogin(phone);
    res.json({message: "Đăng nhập thành công", data: user});
  } catch (error) {
    res.status(500).json({
      error: error?.toString(),
    });
  }
});

router.get("/getCurrent", async (req: Request, res: Response) => {
  try {
    const phone = req.query.phone as string;
    const user = await customerLogin(phone);
    res.json({message: "Success!", data: user});
  } catch (error) {
    res.status(500).json({
      error: error?.toString(),
    });
  }
});
export default router;
