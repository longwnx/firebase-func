import express from "express";

import "express-async-errors";

import appRoute from "./routes/appRoute";
import productRoutes from "./routes/productRoutes";

// **** Variables **** //

const app = express();
// **** Setup **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Sử dụng route mới
app.use("/app-mobile/v1", appRoute);
app.use("/catalogs", productRoutes);

export default app;
