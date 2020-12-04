import routes from "../routes";
import Movie_dbajameschoi from "../models/Movie";

export const home = async (req, res) => {
  try {
    const movies = await Movie_dbajameschoi.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "HOME", movies });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "HOME", movies: [] });
  }
};
//
export const getCreate = (req, res) => res.render("create", { pageTitle: "Create" });

export const postCreate = async (req, res) => {
  const {
    body: { title, year, rating, synopsis, genres },
  } = req;

  try {
    const newMovie = await Movie_dbajameschoi.create({
      title,
      year: Number(year),
      rating: Number(rating),
      synopsis,
      genres: genres.split(","),
    });
    res.redirect(`/${newMovie.id}`);
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const movieDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const movie = await Movie_dbajameschoi.findById(id);
    res.render("movieDetail", { pageTitle: movie.title, movie });
  } catch (error) {
    res.redirect("/");
  }
};

// This gives you an array of movies with a release date of minimum X
const getMovieByMinimumYear = async (year) => {
  try {
    const movies = await Movie_dbajameschoi.find({}).sort({ _id: -1 });
    if (!year) {
      throw Error("❌  YOU FORGOT TO PASS THE MOVIE YEAR TO THE FUNCTION  ❌");
    }
    return movies.filter((m) => m.year >= year);
  } catch (error) {
    console.log(error);
  }
};

// This gives you an array of movies with a rating of minimum X
const getMovieByMinimumRating = async (rating) => {
  try {
    const movies = await Movie_dbajameschoi.find({}).sort({ _id: -1 });
    if (!rating) {
      throw Error("❌  YOU FORGOT TO PASS THE MOVIE RATING TO THE FUNCTION  ❌");
    }
    return movies.filter((m) => m.rating >= rating);
  } catch (error) {
    console.log(error);
  }
};

export const searchMovie = async (req, res) => {
  const {
    query: { rating, year },
  } = req;
  if (rating) {
    const movies = await getMovieByMinimumRating(rating);
    if (movies.length === 0) {
      res.render("404", {
        pageTitle: "Error",
      });
    } else {
      res.render("searchMovies", {
        pageTitle: "Rating",
        header: `Searching by rating: ${rating}, there are ${movies.length} results found.`,
        movies,
      });
    }
  } else if (year) {
    const movies = await getMovieByMinimumYear(year);
    if (movies.length === 0) {
      res.render("404", {
        pageTitle: "Error",
      });
    } else {
      res.render("searchMovies", {
        pageTitle: "Year",
        header: `Searching by year: ${year}, there are ${movies.length} results found.`,
        movies,
      });
    }
  } else {
    res.render("404", {
      pageTitle: "Error",
    });
  }
};

// getMovieEdit, postMovieEdit

export const getMovieEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const movie = await Movie_dbajameschoi.findById(id);
    res.render("movieEdit", { pageTitle: `Edit ${movie.title}`, movie });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

export const postMovieEdit = async (req, res) => {
  const {
    params: { id },
    body: { title, year, rating, synopsis, genres },
  } = req;

  try {
    const genres_array = genres.trim().split(","); // trim first before being array
    await Movie_dbajameschoi.findOneAndUpdate({ _id: id }, { title, year, rating, synopsis, genres: genres_array });
    res.redirect(`/${id}`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

export const deleteMovie = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    await Movie_dbajameschoi.findOneAndDelete({ _id: id });
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
};
