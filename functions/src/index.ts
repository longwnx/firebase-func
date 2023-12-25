// import {onRequest} from "firebase-functions/v2/https";
import {app} from "./server";
import express from "express";
import awsServerlessExpress from "aws-serverless-express";
import {APIGatewayProxyEvent, Context} from "aws-lambda";

const expressApp = express();

expressApp.use("/", app);

const server = awsServerlessExpress.createServer(app);
//
exports.handler = async (event: APIGatewayProxyEvent, context: Context) => {
  return awsServerlessExpress.proxy(server, event, context);
};
