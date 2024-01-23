import {onRequest} from "firebase-functions/v2/https";
import express from "express";
import {app} from "./server";
import {setGlobalOptions} from "../node_modules/firebase-functions/lib/v2";

const expressApp = express();

expressApp.use("/", app);

// Set the maximum instances to 10 for all functions
setGlobalOptions({maxInstances: 10});
export const ecomServices = onRequest(expressApp);
