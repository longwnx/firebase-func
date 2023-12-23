// import {onRequest} from "firebase-functions/v2/https";
import {app} from "./server";
import awsServerlessExpress from "aws-serverless-express";
import {APIGatewayProxyEvent, Context} from "aws-lambda";

// const expressApp = express();

// expressApp.use("/", app);

const server = awsServerlessExpress.createServer(app);

exports.handler = async (event: APIGatewayProxyEvent, context: Context) => {
  // Use aws-serverless-express to proxy the event to your Express app
  return awsServerlessExpress.proxy(server, event, context);
};
// export default onRequest(expressApp);
