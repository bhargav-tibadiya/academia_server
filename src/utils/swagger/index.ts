import swaggerUi from "swagger-ui-express";
import { Application } from "express";
import { ROUTES } from "@utils/constants/routes";
import YAML from "yamljs";

const swaggerDocument = YAML.load("./src/utils/swagger/docs.yaml");

export const setupSwagger = (app: Application) => {
  app.use(ROUTES.DOCS, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};