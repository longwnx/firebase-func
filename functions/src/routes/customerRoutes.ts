import express, {Request, Response} from "express";
import {
  customerLogin,
  handleGetAddressListRequest,
  handleUpdateAddress,
  registerCustomer,
} from "../services/customerServices";
import {formRegister} from "../types/user";

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

router.post("/login", customerLogin);
router.get("/getCurrent", customerLogin);

router.get("/address/list/:id", handleGetAddressListRequest);
router.put("/address/edit/:id", handleUpdateAddress);
export default router;
