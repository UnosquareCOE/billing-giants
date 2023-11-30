import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { seasonRouter, clubsRouter, venueRouter, authenticationRouter, usersRouter,playerRouter } from "./routers";
import { createYoga, createSchema } from "graphql-yoga";
import { venuesResolvers } from "./resolvers";
import { venueDefs } from "./schemas";
import { applyMiddleware } from "graphql-middleware";
import { graphValidation } from "./middleware";
import { verifyAccessToken } from "./middleware/authentication";

const schema = createSchema({
  typeDefs: [venueDefs],
  resolvers: [venuesResolvers]
})

const yoga = createYoga({ schema: applyMiddleware(schema, graphValidation) });

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
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        in: "header",
        name: "Authorization",
        description: "Bearer token to access api endpoints",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ]
};

const openapiSpecification = swaggerJSDoc({
  swaggerDefinition,
  apis: ["./src/routers/*.ts"],
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));
app.use("/swagger.json", (req: Request, res: Response) =>
  res.json(openapiSpecification).status(200)
);

app.use(yoga.graphqlEndpoint, yoga);

app.use("/authentication", authenticationRouter);

// middleware for authenticate user.
app.use(verifyAccessToken);

app.use("/seasons", seasonRouter);
app.use("/clubs", clubsRouter);
app.use("/venues", venueRouter);
app.use("/players", playerRouter);
app.use("/users", usersRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  res.status(500).send(err);
});

export { app };