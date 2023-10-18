import express from "express";

import "express-async-errors";

import appRoute from "./routes/appRoute";
import productRoutes from "./routes/productRoutes";

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

export default app;
