// File: src/handler.ts
import express from "express";
import serverless from "serverless-http";
import {APIGatewayProxyHandler} from "aws-lambda";
import {app as expressApp} from "./server";

const app = express();

// Sử dụng route mới
app.use("/", expressApp);

export const handler: APIGatewayProxyHandler = serverless(app);
