// import {onRequest} from "firebase-functions/v2/https";
import {app} from "./server";
import express from "express";
import serverless from "serverless-http";

const expressApp = express();

expressApp.use("/", app);
// app.use(
//   (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     res.status(404).send();
//   },
// );
//
// app.use(
//   (
//     err: any,
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction,
//   ) => {
//     res.status(err.status || 500).send();
//   },
// );
// const server = awsServerlessExpress.createServer(app);
//
// exports.handler = async (event: APIGatewayProxyEvent, context: Context) => {
//   // Use aws-serverless-express to proxy the event to your Express app
//   return awsServerlessExpress.proxy(server, event, context);
// };
// // export default onRequest(expressApp);

// export const handler = serverless(app);

module.exports.handler = serverless(expressApp);
