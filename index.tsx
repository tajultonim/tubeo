import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import axios, { AxiosResponse } from "axios";
import Link from "next/link";
import Header from "../comps/header";
interface word {
  serial: number;
  word: string;
  pronunciation: string;
  definitions: string[];
}
interface wordItem {
  item: word;
  refIndex: number;
}

const Home: NextPage = () => {
  const [words, setWords] = useState<wordItem[]>([]);
  let searchTimeout: any;
  function checkInput(e: any) {
    if (searchTimeout != undefined) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      callServerScript(e);
    }, 500);
  }
  function callServerScript(e: any) {
    axios("/api/search?q=" + e.target.value.trim()).then(
      (res: AxiosResponse) => {
        setWords(res.data);
      }
    );
  }
  return (
    <>
      <Head>
        <title>অভিধান - একটি পরিপাটি বাংলা অভিধান</title>
        <link rel="icon" href="/icon.jpg" />
      </Head>
      <Header />
      <div className="w-full flex items-center flex-col px-2">
        <div className="w-full h-auto flex items-center flex-col">
          <p className="text-black mt-14 text-4xl">অভিধান</p>
          <p className=" text-gray-500">একটি পরিপাটি বাংলা অভিধান</p>
          <input
            className=" mt-5 bg-blue-50 m-2 p-2 max-w-xl w-full rounded-md outline-blue-500 focus:bg-white"
            placeholder="কাঙ্ক্ষিত শব্দ লিখুন"
            onChange={checkInput}
          />
        </div>
        <div className="max-w-xl w-full">
          {words.map((word: wordItem) => (
            <WordCard
              key={word.item.serial}
              serial={word.item.serial}
              word={word.item.word}
              pronunciation={word.item.pronunciation}
              definitions={word.item.definitions}
            />
          ))}
        </div>
        <div className="flex justify-end w-full max-w-xl mt-2 mb-1">
          <div className="text-xs">
            ©{" "}
            <Link href="https://github.com/tajultonim">
              <a className=" text-gray-500">তাজুল তনিম </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

function WordCard(word: word) {
  return (
    <>
      <Link href={`/word/${word.word}`}>
        <a>
          <div className=" w-full py-2 px-4 border-b-[1px] border-gray-200">
            <p>
              <span className=" text-lg text-gray-900">{word.word}</span>
              {word.pronunciation && (
                <span className=" pl-1 text-gray-500 text-xs">
                  /{word.pronunciation}/
                </span>
              )}
            </p>
            <p className=" text-gray-800 pl-5">
              {word.definitions.map((defination: string) => (
                <p key={defination}>{defination}</p>
              ))}
            </p>
          </div>
        </a>
      </Link>
    </>
  );
}

export default Home;
