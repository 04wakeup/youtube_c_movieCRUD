import "./db";
import "./models/Movie";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import movieRouter from "./movieRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(localsMiddleware);
app.use("/", movieRouter);

// Codesanbox does not need PORT :)///////// //
// app.listen(() => console.log(`✅  Server Ready!`));
const PORT = process.env.PORT || 4000; // find PORT or use default as set

const handleListening = () => console.log(`listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
