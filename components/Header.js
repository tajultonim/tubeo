/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import {
  SearchIcon,
  HomeIcon,
  PlusIcon,
  StarIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Link from "next/link";

function Header() {
  const router = useRouter();

  return (
    <header className="sticky bg-[#040714] top-0 z-[1000] flex items-center px-3 md:px-12 h-[72px] ">
      <Link href={"/"}>
        <a className=" h-full items-center flex">
          {" "}
          <Image
            className="cursor-pointer"
            src="/tubeo.png"
            width={100}
            height={22}
            onClick={() => router.push("/")}
            alt="logo"
          />
        </a>
      </Link>

      <div className="flex md:hidden flex-1 justify-end">
        <Link href={"/search"}>
          <a className="header-link group bg-gray-900 hover:bg-gray-700 p-2 rounded-md">
            <SearchIcon className="h-6" />
          </a>
        </Link>
      </div>

      <div className="hidden ml-10 md:flex items-center space-x-6">
        <Link href={"/"}>
          <a className="header-link group">
            <HomeIcon className="h-4" />
            <span className="span">Home</span>
          </a>
        </Link>
        <Link href={"/search"}>
          <a className="header-link group">
            <SearchIcon className="h-4" />
            <span className="span">Search</span>
          </a>
        </Link>
        <Link href={"/watchlist"}>
          <a className="header-link group">
            <PlusIcon className="h-4" />
            <span className="span">Watchlist</span>
          </a>
        </Link>
        <a className="header-link group">
          <StarIcon className="h-4" />
          <span className="span">Originals</span>
        </a>
        <a className="header-link group">
          <img src="/images/movie-icon.svg" alt="" className="h-5" />
          <span className="span">Movies</span>
        </a>
        <a className="header-link group">
          <img src="/images/series-icon.svg" alt="" className="h-5" />
          <span className="span">Series</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
