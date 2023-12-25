import express from "express";

import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get("/", function(req, res) {
  res.json({messages: "Hello"});
});

app.listen(port, () => console.log("calculator listening on port {port}!"));
export default app;
