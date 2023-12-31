import React from "react";
import CustomPopularity from "./CustomPopularity";
import { useDispatch, useSelector } from "react-redux";


import BookMark from "./BookMark";

const AddInfosCardPage = ({ manga,isFriendCollectionPage,isUserCollectionCardPage }) => {
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const mangaIndex = userInfo
    ? userInfo.colleclist.findIndex((element) => element.mal_id == manga.mal_id)
    : null;

  return (
    <div className="add-info-card-page">
      <BookMark manga={manga} userInfo={userInfo} isFriendCollectionPage={isFriendCollectionPage} isUserCollectionCardPage={isUserCollectionCardPage}/>
      <div className="custom-stars">
        <CustomPopularity manga={manga} userInfo={userInfo} isFriendCollectionPage={isFriendCollectionPage} isUserCollectionCardPage={isUserCollectionCardPage}/>
      </div>
    </div>
  );
};

export default AddInfosCardPage;
