/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import * as functions from "firebase-functions";
// import "express-async-errors";
// import express from "express";
//
// import appRoute from "./routes/appRoute";
// import productRoutes from "./routes/productRoutes";
//
// // **** Variables **** //
//
// const app = express();
// // **** Setup **** //
//
// // Basic middleware
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
//
// // Sử dụng route mới
// app.use("/app", appRoute);
// app.use("/catalogs", productRoutes);
// export const api = functions.https.onRequest(app);

// import * as functions from "firebase-functions";
// import express from "express";
import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
//
// const app = express();
//
// app.get("/hello", (req, res) => {
//   res.send("Hello from Firebase!");
// });

// exports.api = functions.https.onRequest(app);

export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
