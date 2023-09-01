import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Nouveautes = () => {
  const [mangaNewsData, setMangaNewsData] = useState([]);
  const [animeNewsData, setAnimeNewsData] = useState([]);

  useEffect(() => {
    const storedMangaData = localStorage.getItem("mangaNewsData");
    const storedAnimeData = localStorage.getItem("animeNewsData");

    if (storedAnimeData && storedMangaData) {
      setMangaNewsData(JSON.parse(storedMangaData));
      setAnimeNewsData(JSON.parse(storedAnimeData));
    } else {
      axios
        .get(
          "https://api.jikan.moe/v4/top/manga?q=&sfw&filter=bypopularity&filter=publishing"
        )
        .then((res) => {
          setMangaNewsData(res.data);
          localStorage.setItem("mangaNewsData", JSON.stringify(res.data));
        });
      axios
        .get(
          "https://api.jikan.moe/v4/top/anime?q=&sfw&filter=bypopularity&filter=airing"
        )
        .then((res) => {
          setAnimeNewsData(res.data);
          localStorage.setItem("animeNewsData", JSON.stringify(res.data));
        });
    }
  }, []);

  return (
    <div className="nouveautes">
      <div className="nouveautes-mangas">
        <div className="connexion" id="connexionid">
          <h2>Mangas</h2>
        </div>
        {mangaNewsData.data &&
          mangaNewsData.data.map((manga) => (
            <Card manga={manga} key={manga.mal_id} />
          ))}
      </div>
      <div className="nouveautes-animes">
        <div className="connexion" id="connexionid2">
          <h2>Animes</h2>
        </div>
        {animeNewsData.data &&
          animeNewsData.data.map((anime) => (
            <Card manga={anime} key={anime.mal_id} />
          ))}
      </div>
    </div>
  );
};

export default Nouveautes;
