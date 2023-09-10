import React from "react";
import TextTruncate from "./TextTruncate";
import Popularity from "./Popularity";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const Card = ({
  manga,
  isUserCollectionPage,
  isFriendCollectionPage,
  userInfo,
  isCompare
}) => {
  const navigate = useNavigate();

  let { user } = useParams();
  const handleNav = () => {
    if (isUserCollectionPage) {
      navigate(`/cardpage/user:${user}/${manga.mal_id}`, {
        state: {
          manga,
          isFriendCollectionPage, 
        },
      });
    } else if (isFriendCollectionPage) {
      navigate(`/cardpage/user:${user}/${manga.mal_id}`, {
        state: {
          manga,
          isFriendCollectionPage,
        },
      });
    } else {
      navigate(`/cardpage/g${manga.mal_id}`, {
        state: {
          manga,
        },
      });
    }
  };
  return (
    <>
      <div className="new-manga" key={manga.title} onClick={() => handleNav()}>
        <img src={manga.images.webp.large_image_url} alt={manga.title} />
        <div className="manga-title-p">
          <h4>
            {TextTruncate(
              manga.title_english ? manga.title_english : manga.title, isCompare
            )}
          </h4>
        </div>
      </div>
    </>
  );
};

export default Card;
