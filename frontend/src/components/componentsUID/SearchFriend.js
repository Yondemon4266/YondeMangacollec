import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const SearchFriend = ({ userInfo, allUsersData }) => {
  const navigate = useNavigate();
  const [searchUsers, setSearchUsers] = useState(null);
  const handleSearchFriends = (e) => {
    try {
      if (userInfo && allUsersData) {
        if (e.target.value.length > 0) {
          setSearchUsers(
            allUsersData.filter((user) => {
              if (user.pseudo === userInfo.pseudo) return false;
              return user.pseudo.includes(e.target.value);
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
    <div className="search-friends">
      <div className="search-friends-container">
        <input
          type="text"
          name="friendName"
          id="friendName"
          onChange={(e) => handleSearchFriends(e)}
          autoComplete="off"
        />
        {searchUsers ? (
          <div className="search-friends-list">
            {searchUsers.length > 0 ? (
              searchUsers.slice(0, 2).map((user) => {
                return (
                  <div key={user._id}>
                    <span onClick={() => navigate(`/user/${user.pseudo}/collection`, { state: { user}})}>{user.pseudo}</span>
                  </div>
                );
              })
            ) : (
              <div className="friends-not-found">Utilisateur pas trouvé</div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchFriend;
