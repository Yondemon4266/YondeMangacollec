import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { getUser } from "../../actions/user.action";
import CustomPopularityFriend from "./CustomPopularityFriend";

const CustomPopularity = ({ manga, userInfo,isFriendCollectionPage, isUserCollectionCardPage }) => {
  const dispatch = useDispatch();
  const mangaIndex = userInfo
    ? userInfo.colleclist.findIndex((element) => element.mal_id == manga.mal_id)
    : null;
  const [score, setScore] = useState(0);

  const handleScore = async (e) => {
    if (e != score) {
      const scoretitle = document.getElementById("scoretitle");
      const scoreData = { popularityValue: e };
      setScore(e);
      scoretitle.textContent = "Évalué ! Merci pour votre contribution";
      setTimeout(() => {
        scoretitle.textContent = "Évalué !";
      }, 3000);

      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}api/user/colleclistpopularitypatch/${userInfo._id}/${manga.mal_id}`,
        scoreData
      );
      console.log(response);
      await dispatch(getUser(userInfo._id));
    } else {
      console.log("requête non émise car le score est le même qu'avant");
    }
  };
  return (
    <>
    {isUserCollectionCardPage && 
    <>
    {userInfo && userInfo.colleclist[mangaIndex].popularityValue ? <h4 id="scoretitle">Évalué !</h4> : <h4 id="scoretitle">Évaluez cette oeuvre</h4>}
      <Rating
        transition
        onClick={(e) => handleScore(e)}
        initialValue={userInfo && userInfo.colleclist[mangaIndex].popularityValue ? userInfo.colleclist[mangaIndex].popularityValue : "0"}
        showTooltip
        allowFraction
        tooltipDefaultText="0"
        tooltipClassName="custom-tooltip"
        size="30"
      />
      </>}
      {isFriendCollectionPage && <CustomPopularityFriend manga={manga}/> }
    </>
  );
};

export default CustomPopularity;
