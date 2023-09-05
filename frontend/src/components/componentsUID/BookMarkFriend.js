import React from 'react';

const BookMarkFriend = ({manga}) => {
    return (
        <div
      className={
        manga &&
        manga.bookMarkValue &&
        (manga.bookMarkValue == manga.chapters ||
          manga.bookMarkValue == manga.episodes)
          ? "bookmark equal"
          : "bookmark"
      }
      id="bookmark"
    >
      <i className="fa-regular fa-bookmark"></i>
        <div className="friend-mark-book">
          <h4>{manga.bookMarkValue}</h4>
        </div>
      <h4> /{manga.chapters ? manga.chapters : "Nombre d'épisodes/chapitres"}</h4>{" "}
    </div>
    );
};

export default BookMarkFriend;