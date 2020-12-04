import express from "express";
import routes from "./routes";
import { home, getCreate, postCreate } from "./controllers/controller";

const movieRouter = express.Router();

// Add your magic here!/
movieRouter.get(routes.home, home);

movieRouter.get(routes.create, getCreate);
movieRouter.post(routes.create, postCreate);

export default movieRouter;
