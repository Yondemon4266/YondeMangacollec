import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../components/Navigation";
import Card from "../../components/Card";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SearchFriend from "../../components/componentsUID/SearchFriend";
import CollectionUIDUserVide from "../../components/componentsUID/CollectionUIDUserVide";
import CollectionUIDFriendVide from "../../components/componentsUID/CollectionUIDFriendVide";
import CollectionUIDUserNonExistant from "../../components/componentsUID/CollectionUIDUserNonExistant";
import CollectionUIDUser from "../../components/componentsUID/CollectionUIDUser";
import CollectionUIDFriend from "../../components/componentsUID/CollectionUIDFriend";
import CompareCollectionDisplay from "../../components/componentsUID/CompareCollectionDisplay";

const CollectionUID = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  let { user } = useParams();
  const [isCompare, setCompare] = useState(false);
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const allUsersData = useSelector((state) => state.userReducer.allUsersInfo);

  const isUserCollectionPage = location.pathname.startsWith(
    `/user/${userInfo && userInfo.pseudo}/collection`
  );
  const isFriendCollectionPage =
    user !== (userInfo && userInfo.pseudo) &&
    allUsersData &&
    allUsersData.find((i) => i.pseudo === user);

  const userExists =
    allUsersData && allUsersData.find((u) => u.pseudo === user);
  const [collecSearch, setCollecSearch] = useState(null);
  const collectionData = allUsersData.find((i) => i.pseudo === user);
  const handleSearchCollec = (e) => {
    let newSearch = e.target.value;
    setCollecSearch(newSearch);
  };

  const CollectionDisplay = () => {
    if (userInfo && isUserCollectionPage) {
      if ((userInfo && userInfo.colleclist).length > 0) {
        return (
          <CollectionUIDUser
            userInfo={userInfo}
            collecSearch={collecSearch}
            isUserCollectionPage={isUserCollectionPage}
            isFriendCollectionPage={isFriendCollectionPage}
          />
        );
      } else {
        return <CollectionUIDUserVide />;
      }
    } else if (userInfo && isFriendCollectionPage) {
      if (Object.keys(collectionData.colleclist).length > 0) {
        return (
          <CollectionUIDFriend
            collecSearch={collecSearch}
            allUsersData={allUsersData}
            isUserCollectionPage={isUserCollectionPage}
            isFriendCollectionPage={isFriendCollectionPage}
            userInfo={userInfo}
            collectionData={collectionData}
          />
        );
      } else {
        return <CollectionUIDFriendVide />;
      }
    } else if (!userExists) {
      return <CollectionUIDUserNonExistant />;
    }
  };

  const compareCollections = () => {
    let common = [];
    let differentFriend = [];
    let differentUser = [];
    if (isFriendCollectionPage && userInfo) {
      isFriendCollectionPage.colleclist.forEach((friendelement) => {
        const match =
          userInfo &&
          userInfo.colleclist.find(
            (userelement) => userelement.mal_id === friendelement.mal_id
          );

        if (match) {
          common.push(friendelement);
        } else {
          differentFriend.push(friendelement);
        }
      });
      userInfo &&
        userInfo.colleclist.forEach((userelement) => {
          const match = isFriendCollectionPage.colleclist.find(
            (friendelement) => friendelement.mal_id === userelement.mal_id
          );
          if (!match) {
            differentUser.push(userelement);
          };
        });
    }
    return { common, differentFriend, differentUser };
  };

  const compareList = compareCollections();

  return (
    <>
      <Navigation />
      <div className="container">
        <div className="connexion">
          <div className="searchinput" style={{ width: "25%" }}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="search"
              name="search-collec"
              id="search-collec"
              placeholder="Rechercher dans la collection"
              onChange={(e) => handleSearchCollec(e)}
              autoComplete="off"
            />
          </div>
          <SearchFriend userInfo={userInfo} allUsersData={allUsersData} />
          {isFriendCollectionPage && (
            <button type="button" onClick={() => setCompare(true)}>
              Comparez vos collections !
            </button>
          )}
        </div>
        {isCompare ? (
          <CompareCollectionDisplay compareList={compareList} isFriendCollectionPage={isFriendCollectionPage} />
        ) : (
          CollectionDisplay()
        )}
      </div>
    </>
  );
};

export default CollectionUID;
