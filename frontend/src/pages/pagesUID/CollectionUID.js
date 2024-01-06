import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navigation from "../../components/Navigation";
import { useLocation, useParams } from "react-router-dom";
import CollectionUIDUserVide from "../../components/componentsUID/CollectionUIDUserVide";
import CollectionUIDFriendVide from "../../components/componentsUID/CollectionUIDFriendVide";
import CollectionUIDUserNonExistant from "../../components/componentsUID/CollectionUIDUserNonExistant";
import CollectionUIDUser from "../../components/componentsUID/CollectionUIDUser";
import CollectionUIDFriend from "../../components/componentsUID/CollectionUIDFriend";
const CollectionUID = () => {
  const location = useLocation();
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
            handleSearchCollec={handleSearchCollec}
            allUsersData={allUsersData}
            isCompare={isCompare}
            setCompare={setCompare}
          />
        );
      } else {
        return (
          <CollectionUIDUserVide
            userInfo={userInfo}
            isFriendCollectionPage={isFriendCollectionPage}
            isCompare={isCompare}
            setCompare={setCompare}
            allUsersData={allUsersData}
            handleSearchCollec={handleSearchCollec}
          />
        );
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
            handleSearchCollec={handleSearchCollec}
            isCompare={isCompare}
            setCompare={setCompare}
            compareList={compareList}
          />
        );
      } else {
        return (
          <CollectionUIDFriendVide
            collectionData={collectionData}
            userInfo={userInfo}
            isCompare={isCompare}
            setCompare={setCompare}
            allUsersData={allUsersData}
            handleSearchCollec={handleSearchCollec}
            isFriendCollectionPage={isFriendCollectionPage}
            compareList={compareList}
          />
        );
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
          }
        });
    }
    return { common, differentFriend, differentUser };
  };

  const compareList = compareCollections();

  return (
    <>
      <Navigation />
      <div className="container">{CollectionDisplay()}</div>
    </>
  );
};

export default CollectionUID;
