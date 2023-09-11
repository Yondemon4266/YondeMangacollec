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
  // HELLO

  const [bookMarkValue, setBookMarkValue] = useState(null);
  const mangaIndex = userInfo
  ? userInfo.colleclist.findIndex((element) => element.mal_id == manga.mal_id)
  : null;

  const handleBookMark = async (e) => {
    e.preventDefault();
    if (isUserCollectionCardPage) {
      if (userInfo && bookMarkValue) {
        const bookMarkData = { bookMarkValue };
        if (manga && manga.bookMarkValue) {
          if (manga.bookMarkValue != bookMarkValue) {
            const BookMarkElement = document.querySelector('.bookmarkinfo');
            BookMarkElement.style.color = "#067e06";
            BookMarkElement.style.fontSize = "15px";
            BookMarkElement.style.fontWeight = "600";
            BookMarkElement.style.marginBottom = "10px";

            BookMarkElement.textContent = "Marque page ajoutée avec succès !";
            setTimeout(() => {
              BookMarkElement.textContent = "";
            }, 2000);
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
      <form action="" id="formBookMark" onSubmit={(e) => handleBookMark(e)}>
      <input
        type="number"
        name="bookmarkint"
        id="bookmarkint"
        placeholder="Marque page"
        onChange={(e) => setBookMarkValue(e.target.value)}
        defaultValue={userInfo.colleclist[mangaIndex].bookMarkValue}
        max={manga.chapters}
      />
      <i className="fa-solid fa-check" onClick={(e) => handleBookMark(e)}></i>
      </form>
      <h4>
        {" "}
        /{manga.chapters ? manga.chapters : (manga.episodes ? manga.episodes : "")}
      </h4>{" "}
      
    </div>}
    <div className="bookmarkinfo"></div>
    {isFriendCollectionPage && <BookMarkFriend manga={manga}/>}
    </>
  );
};

export default BookMark;
