
import express, { NextFunction, Request, Response } from "express";
import employeeRouter from "./routes/employee.router";
import loggerMiddleware from "./middleware/logger.middleware";
import bodyParser from "body-parser";
import dataSource from "./db/data-source.db";
import HttpException from "./exceptions/http.exceptions";
import errorMiddleware from "./middleware/error.middleware";


const server = express();
server.use(bodyParser.json());
server.use(loggerMiddleware);
server.use("/employees", employeeRouter);
server.use(errorMiddleware);

server.get("/", (request: Request, response: Response) => {
  response.status(201).send("home");
});

(async () => {
  try {
    await dataSource.initialize();
  } catch (e) {
    console.log("failed to initialize dataSource: ", e);
    process.exit(1);
  }
  server.listen(3000, () => {
    console.log("server is running on port 3000");
  });
})();
