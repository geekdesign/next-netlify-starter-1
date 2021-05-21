import Head from "next/head";
import Image from "next/image";
import { Client } from "@notionhq/client";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Moment from "moment";

export default function Blog({ results }) {
  useEffect(() => {
    console.log(results);
  });

  const getDatabaseDispaly = () => {
    let jsx = [];
    results.forEach((article) => {
      if (article.properties.Publié.checkbox === true) {
        jsx.push(
          <div className="flex mb-10" key={article.id}>
            <img
              src={article.properties.ImageUne.files[0].name}
              alt={article.properties.Titre.title[0].plain_text}
              className="h-auto w-1/3 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden border-grey-light border-b border-l"
            />
            <div className="w-2/3 border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div className="mb-8">
                <div className="text-black font-bold text-xl mb-2">
                  {article.properties.Titre.title[0].plain_text}
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-sm">
                  <p className="text-grey-dark">
                    <span className="mr-1 font-bold">Publié le:</span>
                    {Moment(article.properties.DateCreation.date.start).format(
                      "d MMM YYYY"
                    )}
                  </p>
                  <p className="text-black leading-none">
                    <span className="mr-1 font-bold">Par:</span>
                    {article.properties.Auteur.people[0].name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      }
    });
    return jsx;
  };

  Moment.locale("fr");
  return (
    <div>
      <Head>
        <title>MonSiteWeb</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Blog
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">{getDatabaseDispaly()}</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const databaseId = "e307f98844ec4ac6a8650dc14aad3e20";
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  return {
    props: {
      results: response.results,
    },
  };
}