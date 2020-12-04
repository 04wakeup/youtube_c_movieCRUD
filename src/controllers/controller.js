import routes from "../routes";
import Movie_dbajameschoi from "../models/Movie";

export const home = async (req, res) => {
  try {
    const movies = await Movie_dbajameschoi.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "HOME", movies });
    console.log(movies);
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "HOME", movies: [] });
  }
};
//
export const getCreate = (req, res) =>
  res.render("create", { pageTitle: "Create" });

export const postCreate = async (req, res) => {
  const {
    body: { title, year, rating, synopsis, genres }
  } = req;

  try {
    const newMovie = await Movie_dbajameschoi.create({
      title,
      year: Number(year),
      rating: Number(rating),
      synopsis,
      genres
    });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
