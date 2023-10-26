import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import { seasonRouter, clubsRouter, venueRouter } from "./routers";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Billing Giants API",
    version: "0.0.1",
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Local development server",
    },
  ],
};

const openapiSpecification = swaggerJSDoc({
  swaggerDefinition,
  apis: ["./src/routers/*.ts"],
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/seasons", seasonRouter);
app.use("/clubs", clubsRouter);
app.use("/venues", venueRouter);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));
app.use("/swagger.json", (req: Request, res: Response) =>
  res.json(openapiSpecification).status(200)
);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  res.status(500).send(err);
});

export { app };