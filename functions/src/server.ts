import express from "express";

import "express-async-errors";

import appRoute from "./routes/appRoute";
import productRoutes from "./routes/productRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import customerRoutes from "./routes/customerRoutes";
import orderRoutes from "./routes/orderRoutes";

import dotenv from "dotenv";

// **** Setup DotEnv config **** //
const result2 = dotenv.config();
if (result2.error) {
  throw result2.error;
}

// **** Variables **** //
const app = express();
// **** Setup **** //
const port = 3000;
// Basic middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
// Sử dụng route mới
app.use("/app-mobile/v1", appRoute);
app.use("/catalog/v1", productRoutes);
app.use("/review/v1", reviewRoutes);
app.use("/woocommerce-user/v1", customerRoutes);
app.use("/order/v1", orderRoutes);

export {app};
