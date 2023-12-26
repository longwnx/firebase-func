import awsServerlessExpress from "aws-serverless-express";
import {APIGatewayProxyHandler} from "aws-lambda";
import {app} from "./server";
import express from "express";

const appExpress = express();

appExpress.use("/", app);

const server = awsServerlessExpress.createServer(appExpress);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const handler: APIGatewayProxyHandler = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context);
};
