import {onRequest} from "firebase-functions/v2/https";
import express from "express";
import app from "./server";

const expressApp = express();

expressApp.use("/", app);

export const helloWorld = onRequest(expressApp);
