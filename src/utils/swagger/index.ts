import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";
import { ROUTES } from "@utils/constants/routes";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Academia API Documentation",
      version: "1.0.0",
      description: "Academia is Student Information System. Refined version of Uka Tarsadia University SIS.",
    },
    servers: [
      {
        url: "http://localhost:5000/",
        description: "Local server",
      },
    ],
  },
  apis: ["./src/utils/swagger/docs.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Application) => {
  app.use(ROUTES.DOCS, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};