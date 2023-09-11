import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Recherche = () => {
  useEffect(() => {
    window.scrollTo(0,0);
  }, [])
  const navigate = useNavigate();
  const animeNewsData = JSON.parse(localStorage.getItem("animeNewsData"))
    ? JSON.parse(localStorage.getItem("animeNewsData"))
    : null;
  const mangaNewsData = JSON.parse(localStorage.getItem("mangaNewsData"))
    ? JSON.parse(localStorage.getItem("mangaNewsData"))
    : null;
  const [animes, setAnimes] = useState(false);
  const [search, setSearch] = useState("");
  let dataRecu = [];

  const handleSearch = (e) => {
    let newSearch = e.target.value;
    setSearch(newSearch);
  };

  const handleClick = async (animemanga, e) => {
    let newSearch = animemanga.title;
    setSearch(newSearch);
    await handleSubmit(e, newSearch);
  };

  const handleSubmit = async (e, search) => {
    e.preventDefault();
    if (animes) {
      await axios
        .get(
          `https://api.jikan.moe/v4/anime?q=${search}&sfw&order_by=popularity`
        )
        .then((res) => {
          dataRecu = res.data.data;
          navigate(`/recherche/s${uuidv4()}`, { state: { data: dataRecu } });
        });
    } else {
      await axios
        .get(
          `https://api.jikan.moe/v4/manga?q=${search}&sfw&order_by=popularity`
        )
        .then((res) => {
          dataRecu = res.data.data;
          navigate(`/recherche/s${uuidv4()}`, { state: { data: dataRecu } });
        });
    }
  };

  const animeList = animeNewsData
    ? animeNewsData.data.map((anime) => (
        <li key={anime.mal_id}>
          <button type="button" onClick={(e) => handleClick(anime, e)}>
            {anime.title_english ? anime.title_english : anime.title}
          </button>
        </li>
      ))
    : null;

  const mangaList = mangaNewsData
    ? mangaNewsData.data.map((manga) => (
        <li key={manga.mal_id}>
          <button type="button" onClick={(e) => handleClick(manga, e)}>
            {manga.title_english ? manga.title_english : manga.title}
          </button>
        </li>
      ))
    : null;
  return (
    <div>
      <Navigation />
      <div className="container">
        <div className="search">
          <form action="" onSubmit={(e) => handleSubmit(e, search)} style={{alignItems:"flex-start"}}>
            <div className="connexion" id="connexionid3">
              <div className="searchinput">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="search"
                  name="search"
                  id="search"
                  value={search}
                  autoComplete="off"
                  placeholder="Rechercher"
                  onChange={(e) => handleSearch(e)}
                ></input>
              </div>
              <div className="ul-btn-options">
                <ul className="btn-options">
                  <li>
                    <button
                      type="button"
                      onClick={() => setAnimes(false)}
                      className={animes ? "not-activeBtn" : "activeBtn"}
                    >
                      MANGAS
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setAnimes(true)}
                      className={animes ? "activeBtn" : "not-activeBtn"}
                    >
                      ANIMES
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="search-list" style={{width:"100%"}}>
              <ul className="animelist">{animes ? animeList : mangaList}</ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Recherche;
