import express, { Request, Response, json, urlencoded } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import cors from 'cors';
import { seasonRouter } from './routers/seasons';

const app = express()
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "D&D Companion Tool API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "",
      description: "Local development server",
    },
  ],
};

const openapiSpecification = swaggerJSDoc({
  swaggerDefinition,
  apis: ["./routers/*.ts"],
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));
app.use("/swagger.json", (req: Request, res: Response) =>
  res.json(openapiSpecification).status(200)
);


app.use("/seasons", seasonRouter);

const PORT = process.env.port || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
})