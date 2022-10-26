import Head from "next/head";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import Slider from "../components/Slider";
import MoviesCollection from "../components/MoviesCollection";
import ShowsCollection from "../components/ShowsCollection";

export default function Home({
  nowPlayingMovies,
  popularMovies,
  popularShows,
  top_ratedMovies,
  top_ratedShows,
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>TUBEO: Stream boundless</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="relative min-h-screen after:bg-home after:bg-center after:bg-cover after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1]">
        <Slider />
        <MoviesCollection
          results={nowPlayingMovies}
          title="Now Playing Movies"
        />
        <MoviesCollection results={popularMovies} title="Popular Movies" />
        <ShowsCollection results={popularShows} title="Popular Shows" />
        <MoviesCollection results={top_ratedMovies} title="Top Rated Movies" />
        <ShowsCollection results={top_ratedShows} title="Top Rated Shows" />
      </main>
      <footer className=" flex w-full justify-center -mt-6 pb-2">
        Made with 💖 by TajulTonim
      </footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const [
    nowPlayingMoviesRes,
    popularMoviesRes,
    popularShowsRes,
    top_ratedMoviesRes,
    top_ratedShowsRes,
  ] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`
    ),
    fetch(`
    https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`),
  ]);

  const [
    nowPlayingMovies,
    popularMovies,
    popularShows,
    top_ratedMovies,
    top_ratedShows,
  ] = await Promise.all([
    nowPlayingMoviesRes.json(),
    popularMoviesRes.json(),
    popularShowsRes.json(),
    top_ratedMoviesRes.json(),
    top_ratedShowsRes.json(),
  ]);

  return {
    props: {
      nowPlayingMovies: nowPlayingMovies.results,
      popularMovies: popularMovies.results,
      popularShows: popularShows.results,
      top_ratedMovies: top_ratedMovies.results,
      top_ratedShows: top_ratedShows.results,
    },
  };
}
