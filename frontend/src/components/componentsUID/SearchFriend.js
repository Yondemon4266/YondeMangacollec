import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import img from "../../assets/onizuka.jpg";
const SearchFriend = ({ userInfo, allUsersData, handleSearchCollec }) => {
  const navigate = useNavigate();
  const [searchUsers, setSearchUsers] = useState(null);
  const handleSearchFriends = (e) => {
    try {
      if (userInfo && allUsersData) {
        if (e.target.value.length > 0) {
          setSearchUsers(
            allUsersData.filter((user) => {
              if (user.pseudo === userInfo.pseudo) return false;
              return user.pseudo
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
            })
          );
        } else {
          setSearchUsers(null);
        }
      }
    } catch (err) {
      console.log("Problème lors de la recherche d'ami ", err);
    }
  };
  return (
    <div className="searchinputs">
      <div className="searchinput">
        <i className="fa-solid fa-book" style={{ color: "black" }}></i>
        <input
          type="search"
          name="search-collec"
          id="search-collec"
          placeholder="Rechercher un manga"
          onChange={(e) => handleSearchCollec(e)}
          autoComplete="off"
        />
      </div>
      <div className="search-friends">
        <div className="search-friends-container">
          <i className="fa-solid fa-user-group"></i>
          <input
            type="text"
            name="friendName"
            id="friendName"
            onChange={(e) => handleSearchFriends(e)}
            autoComplete="off"
            placeholder="Rechercher un ami"
          />
          {searchUsers ? (
            <div className="search-friends-list">
              {searchUsers.length > 0 ? (
                searchUsers.slice(0, 2).map((user) => {
                  return (
                    <div
                      key={user?._id}
                      className="friend"
                      onClick={() => {
                        navigate(`/user/${user?.pseudo}/collection`, {
                          state: { user },
                        });
                        setSearchUsers(null);
                      }}
                    >
                      <img
                        src={
                          user?.img
                            ? `https://server-yondemangacollec.onrender.com/images/${user?.img}`
                            : img
                        }
                      />
                      <span id="frienduserpseudo">{user.pseudo}</span>
                      <div className="gradeold">
                        <span id="grade"></span>
                      </div>
                      <div className="level">
                        <p>{user?.level}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="friend">Utilisateur pas trouvé</div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SearchFriend;
