import Head from "next/head";
import axios from "axios";
import { useState } from "react";
import Header from "../components/Header";
import { SearchIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";

function Search() {
  let [movies, setMovies] = useState([]);
  let searchTimeout;
  function checkInput(e) {
    if (searchTimeout != undefined) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      callServerScript(e);
    }, 500);
  }
  function callServerScript(e) {
    axios("/api/search?q=" + e.target.value.trim()).then((res) => {
      setMovies(res.data);
    });
  }

  return (
    <>
      <Header />
      <Head>
        <title>Search | TUBEO</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className="flex items-center justify-center mt-3">
        <div className="flex flex-col w-full items-center">
          <div className="w-full flex max-w-xl">
            <input
              className={`w-full pl-3 p-2 text-gray-900 outline-none ${
                movies.length ? "rounded-tl-lg" : "rounded-l-lg"
              }`}
              placeholder="Enter title name"
              onChange={(e) => {
                checkInput(e);
              }}
            ></input>

            <div
              className={`px-2 cursor-pointer bg-gray-200 flex justify-center items-center ${
                movies.length ? "rounded-tr-lg" : "rounded-r-lg"
              }`}
            >
              <SearchIcon className="h-7 fill-gray-900" />
            </div>
          </div>
          <div className=" w-full flex justify-center">
            <div className="w-full max-w-xl bg-gray-700">
              {movies.map((m) => (
                <MovieCard key={m.id} m={m} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MovieCard({ m }) {
  return (
    <>
      <Link
        href={
          "/" +
          m.type +
          "/" +
          m.title
            .toLowerCase()
            .replace(/[^A-Za-z0-9]/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .replace(/ /g, "-") +
          "-" +
          m.id
        }
      >
        <a>
          <div className=" flex items-center m-1 border-b border-gray-400 p-1">
            <div className=" aspect-[2/3] bg-[rgba(0,0,0,0)] w-10 relative">
              <Image
                src={
                  m.poster
                    ? "https://image.tmdb.org/t/p/w500" + m.poster
                    : "/images/no_poster.jpg"
                }
                alt={m.title}
                layout="fill"
                className=""
                objectFit="contain"
              />
            </div>
            <div className="w-full text-white pl-1">
              {m.title}{" "}
              {m.release ? "(" + new Date(m.release).getFullYear() + ")" : ""}
            </div>
          </div>
        </a>
      </Link>
    </>
  );
}

export default Search;
