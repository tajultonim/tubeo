import axios from "axios";
let tmdbUrl = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&language=en-US&page=1&include_adult=true&query=`;

export default async function search(req, res) {
  let q = req.query.q;
  let r = await axios(tmdbUrl + q);
  let narr = [];
  r.data.results.map((movie) => {
    if (movie.media_type == "movie" || movie.media_type == "tv") {
      narr.push({
        title:
          movie.name ||
          movie.original_name ||
          movie.title ||
          movie.original_title,
        release: movie.release_date || movie.first_air_date,
        poster: movie.poster_path,
        id: movie.id,
        type: movie.media_type == "movie" ? "movie" : "show",
      });
    }
  });
  res.send(narr);
}
