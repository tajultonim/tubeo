/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PlusIcon, XIcon, MinusIcon } from "@heroicons/react/solid";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
const getColors = require("get-image-colors");
const BASE_URL = "https://image.tmdb.org/t/p/original/";
import axios from "axios";

function Movie({ result }) {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const router = useRouter();
  const [showPlayer, setShowPlayer] = useState(false);
  const [showMov, setShowMov] = useState(false);
  const index = result.videos.results.findIndex(
    (element) => element.type === "Trailer"
  );
  const [isInList, setIsInList] = useState(false);

  let accent = result.colors[0];
  useEffect(() => {
    let list = JSON.parse(localStorage.getItem("watchlist"));
    if (list) {
      setIsInList(
        list.filter((item) => item.id == result.id).length ? true : false
      );
    }
  }, []);

  function toggleToWatchList() {
    setIsInList(!isInList);
    let list = JSON.parse(localStorage.getItem("watchlist"));
    if (list) {
      if (list.filter((item) => item.id == result.id).length) {
        localStorage.setItem(
          "watchlist",
          JSON.stringify(list.filter((item) => item.id != result.id))
        );
      } else {
        let nl = list;
        nl.push({
          id: result.id,
          poster: result.poster_path,
          title: result.title,
          type: "movie",
        });
        console.log(nl);
        localStorage.setItem("watchlist", JSON.stringify(nl));
      }
    } else {
      localStorage.setItem(
        "watchlist",
        JSON.stringify([
          {
            id: result.id,
            poster: result.poster_path,
            title: result.title,
            type: "movie",
          },
        ])
      );
    }
  }

  return (
    <>
      <div className="relative">
        <Head>
          <title>{result.title || result.original_name} | TUBEO </title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <section className="relative z-50">
          <div className="relative min-h-[calc(100vh-72px)]">
            <Image
              src={
                `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
                `${BASE_URL}${result.poster_path}`
              }
              alt="poster"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="absolute inset-y-28 md:inset-y-auto md:bottom-10 inset-x-4 md:inset-x-12 space-y-6 z-50">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold"
              style={{ color: accent.isDark ? "white" : "black" }}
            >
              {result.title || result.original_name}
            </h1>
            <div className="flex items-center space-x-3 md:space-x-5">
              <button
                className="text-xs md:text-base bg-[#f9f9f9] text-black flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]"
                style={{
                  backgroundColor: accent.color,
                  color: accent.isDark ? "white" : "black",
                }}
                onClick={() => {
                  setShowMov(true);
                  setShowPlayer(false);
                }}
              >
                <img
                  src={
                    accent.isDark
                      ? "/images/play-icon-white.svg"
                      : "/images/play-icon-black.svg"
                  }
                  alt="icon"
                  className="h-6 md:h-8"
                />
                <span className="uppercase font-medium tracking-wide">
                  Watch
                </span>
              </button>

              <button
                className="text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]"
                onClick={() => {
                  setShowPlayer(true);
                  setShowMov(false);
                }}
              >
                <img
                  src="/images/play-icon-white.svg"
                  alt=""
                  className="h-6 md:h-8"
                />
                <span className="uppercase font-medium tracking-wide">
                  Trailer
                </span>
              </button>

              <div
                className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60 "
                onClick={() => {
                  toggleToWatchList();
                }}
              >
                {isInList ? (
                  <MinusIcon className="h-6" />
                ) : (
                  <PlusIcon className="h-6" />
                )}
              </div>

              {/* <div className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer bg-black/60">
                <img src="/images/group-icon.svg" alt="" />
              </div> */}
            </div>

            <p
              className="text-xs md:text-sm"
              style={{ color: accent.isDark ? "white" : "black" }}
            >
              {result.release_date || result.first_air_date} •{" "}
              {Math.floor(result.runtime / 60)}h {result.runtime % 60}m •{" "}
              {result.genres.map((genre) => genre.name + " ")} •{" "}
              {result.vote_average}/10
            </p>
            <h4
              className="text-sm md:text-lg max-w-4xl"
              style={{ color: accent.isDark ? "white" : "black" }}
            >
              {result.overview}
            </h4>
          </div>

          {/* Bg Overlay */}
          {(showPlayer || showMov) && (
            <div className="absolute inset-0 bg-black opacity-50 h-full w-full z-50"></div>
          )}
          <div>
            <div
              className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000`}
              style={{
                opacity: showPlayer || showMov ? 1 : 0,
                zIndex: showPlayer || showMov ? 50 : 0,
              }}
            >
              <div className="flex items-center justify-between bg-black text-[#f9f9f9] pl-3 pr-1 py-1">
                <span className="font-semibold">
                  {" "}
                  {showPlayer ? "Trailer" : showMov ? "Watch" : ""}
                </span>
                <div
                  className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]"
                  onClick={() => {
                    setShowPlayer(false);
                    setShowMov(false);
                  }}
                >
                  <XIcon className="h-5" />
                </div>
              </div>
              <div className="relative pt-[56.25%] w-full aspect-video">
                {showPlayer && (
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${result.videos?.results[index]?.key}`}
                    width="100%"
                    height="100%"
                    className="w-full h-full"
                    style={{ position: "absolute", top: "0", left: "0" }}
                    controls={true}
                    playing={showPlayer}
                  />
                )}
                {showMov && (
                  <iframe
                    id="frame"
                    className=" w-full h-full"
                    style={{ position: "absolute", top: "0", left: "0" }}
                    allowFullScreen={true}
                    src={
                      "https://www.2embed.to/embed/tmdb/movie?id=" + result.id
                    }
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Movie;

export async function getServerSideProps(context) {
  let { id } = context.query;
  id = id.split("-")[id.split("-").length - 1];

  const request = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=videos`
  ).then((response) => response.json());

  let url = `${BASE_URL}${request.backdrop_path || request.poster_path}`;
  await axios({ method: "get", url, responseType: "arraybuffer" }).then(
    async function (response) {
      let buffer = Buffer.from(response.data, "binary");
      let colors = await getColors(buffer, "image/jpg");
      colors = colors.map((color) => {
        return { color: color.css(), isDark: color.get("lab.l") < 70 };
      });
      request.colors = colors;
    }
  );

  return {
    props: {
      result: request,
    },
  };
}
