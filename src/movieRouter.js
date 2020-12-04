import express from "express";
import routes from "./routes";
import { home, getCreate, postCreate, movieDetail, searchMovie, getMovieEdit, postMovieEdit, deleteMovie } from "./controllers/controller";

const movieRouter = express.Router();

// Add your magic here!/
movieRouter.get(routes.home, home);

// Search
movieRouter.get(routes.search, searchMovie);

// Create
movieRouter.get(routes.create, getCreate);
movieRouter.post(routes.create, postCreate);

// Detail
movieRouter.get("/:id", movieDetail);

// Edit
movieRouter.get("/:id/edit", getMovieEdit);
movieRouter.post("/:id/edit", postMovieEdit);
// Delete
movieRouter.get("/:id/delete", deleteMovie);
export default movieRouter;
