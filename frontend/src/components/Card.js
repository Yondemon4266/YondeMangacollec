import React from "react";
import TextTruncate from "./TextTruncate";
import Popularity from "./Popularity";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Card = ({ manga, isUserCollectionPage, userInfo }) => {
  const navigate = useNavigate();
  const handleNav = () => {
    if (isUserCollectionPage) {
      navigate(`/cardpage/user:${userInfo && userInfo.pseudo}/${manga.mal_id}`, {
        state: {
          manga,
        },
      });
    } else {
      navigate(`/cardpage/${manga.mal_id}`, {
        state: {
          manga,
        },
      });
    }
  };
  return (
    <>
      {isUserCollectionPage ? (
        <div
          className="new-manga"
          key={manga.title}
          onClick={() => handleNav()}
        >
          <img src={manga.images.webp.large_image_url} alt={manga.title} />
          <div className="manga-title-p">
            <h4>
              {TextTruncate(
                manga.title_english ? manga.title_english : manga.title
              )}
            </h4>
          </div>
        </div>
      ) : (
        <div
          className="new-manga"
          key={manga.title}
          onClick={() => handleNav()}
        >
          <img src={manga.images.webp.large_image_url} alt={manga.title} />
          <div className="manga-title-p">
            <h4>
              {TextTruncate(
                manga.title_english ? manga.title_english : manga.title
              )}
            </h4>
          </div>
          
        </div>
      )}
    </>
  );
};

export default Card;
