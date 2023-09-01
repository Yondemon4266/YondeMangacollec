import React from "react";
import TextTruncate from "./TextTruncate";
import Popularity from "./Popularity";
import { useNavigate } from "react-router-dom";
const Card = ({ manga }) => {
  const navigate = useNavigate();
  const handleNav = () => {
    navigate(`/cardpage/c${manga.mal_id}`, {
      state: {
        manga
      }
    });
  }
  return (
    <div className="new-manga" key={manga.title} onClick={() => handleNav()}>
              <img src={manga.images.webp.large_image_url} alt={manga.title} />
              <div className="manga-title-p">
              <h4>{TextTruncate(manga.title_english ? manga.title_english : manga.title)}</h4>
              </div>
              <Popularity manga={manga} />
            </div>
  );
};

export default Card;
