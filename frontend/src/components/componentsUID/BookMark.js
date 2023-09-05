import React, { useState } from "react";
import { getUser } from "../../actions/user.action";
import { useDispatch } from "react-redux";
import axios from "axios";
import BookMarkFriend from "./BookMarkFriend";

const BookMark = ({
  manga,
  userInfo,
  isFriendCollectionPage,
  isUserCollectionCardPage,
}) => {
  const dispatch = useDispatch();

  const [bookMarkValue, setBookMarkValue] = useState(null);
  const mangaIndex = userInfo
  ? userInfo.colleclist.findIndex((element) => element.mal_id == manga.mal_id)
  : null;

  const handleBookMark = async () => {
    if (isUserCollectionCardPage) {
      if (userInfo && bookMarkValue) {
        const bookMarkData = { bookMarkValue };
        if (manga && manga.bookMarkValue) {
          if (manga.bookMarkValue != bookMarkValue) {
            const response = await axios.patch(
              `${process.env.REACT_APP_API_URL}api/user/colleclistbookmarkpatch/${userInfo._id}/${manga.mal_id}`,
              bookMarkData
            );
            console.log(response);
            await dispatch(getUser(userInfo._id));
          } else {
            console.log("Même chiffre envoyé, pas de requête faite");
          }
        } else {
          const response = await axios.patch(
            `${process.env.REACT_APP_API_URL}api/user/colleclistbookmarkpatch/${userInfo._id}/${manga.mal_id}`,
            bookMarkData
          );
          console.log(response);
          await dispatch(getUser(userInfo._id));
        }
      } else {
        console.log(
          "Requête non émise car utilisateur non connecté OU valeur de bookmark null"
        );
      }
    }
  };
  return (
    <>
    {isUserCollectionCardPage && <div
      className={
        userInfo &&
        userInfo.colleclist[mangaIndex].bookMarkValue &&
        (userInfo.colleclist[mangaIndex].bookMarkValue == manga.chapters ||
          userInfo.colleclist[mangaIndex].bookMarkValue == manga.episodes)
          ? "bookmark equal"
          : "bookmark"
      }
      id="bookmark"
    >
      <i className="fa-regular fa-bookmark"></i>
      <input
        type="number"
        name="bookmarkint"
        id="bookmarkint"
        placeholder="Num"
        onChange={(e) => setBookMarkValue(e.target.value)}
        defaultValue={userInfo.colleclist[mangaIndex].bookMarkValue}
        max={manga.chapters}
      />
      <i className="fa-solid fa-check" onClick={() => handleBookMark()}></i>
      <h4>
        {" "}
        /{manga.chapters ? manga.chapters : "Nombre d'épisodes/chapitres"}
      </h4>{" "}
    </div>}
    {isFriendCollectionPage && <BookMarkFriend manga={manga}/>}
    </>
  );
};

export default BookMark;
