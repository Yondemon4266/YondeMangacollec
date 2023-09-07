import React from "react";
import Card from "../Card";
import { useParams } from "react-router-dom";
import { dateFormater } from "../../Utils";
import SearchFriend from "./SearchFriend";
import CompareCollectionDisplay from "./CompareCollectionDisplay";
import NiveauJauge from "./NiveauJauge";

const CollectionUIDFriend = ({
  collecSearch,
  isUserCollectionPage,
  isFriendCollectionPage,
  allUsersData,
  userInfo,
  collectionData,
  setCompare,
  isCompare,
  handleSearchCollec,
  compareList,
}) => {
  let { user } = useParams();
  return (
    <>
      <div className="profilUser">
        <div className="profil-container">
          <div className="imgpseudo">
            <img
              src={`../../../${collectionData && collectionData.picture}`}
              alt={`image de ${collectionData && collectionData.pseudo}`}
            />
            <h4>{collectionData && collectionData.pseudo}</h4>
          </div>
          <div className="rightpart">
            <div className="gradeold">
              <h5>Titre : Vétéran Kage</h5>
            </div>
            <div className="niveau">
              <h5>Niveau : {Math.floor(collectionData && collectionData.level)}</h5>
              <NiveauJauge userInfo={collectionData}/>
            </div>
            <div className="membredepuis">
              <h5>
                Membre depuis le :{" "}
                {collectionData && dateFormater(collectionData.createdAt)}
              </h5>
            </div>
          </div>
        </div>
        <div className="badges"></div>
        <div className="utility-bar">
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
          {isFriendCollectionPage && !isCompare && (
            <button
              type="button"
              id="compareBtn"
              onClick={() => setCompare(true)}
            >
              Comparez vos collections !
            </button>
          )}
          {isFriendCollectionPage && isCompare && (<button
              type="button"
              id="compareBtn"
              onClick={() => setCompare(false)}
            >
              Annuler la comparaison
            </button>)}
        </div>
      </div>
      <div className="schedules" id="scheds">
        {isCompare ? (
          <CompareCollectionDisplay
            compareList={compareList}
            isFriendCollectionPage={isFriendCollectionPage}
            isCompare={isCompare}
            collecSearch={collecSearch}
            handleSearchCollec={handleSearchCollec}
            userInfo={userInfo}
          />
        ) : (
          <div className="schedule-day-container">
            <div className="schedule-day-list">
              {allUsersData &&
                collectionData.colleclist
                  .filter((element) => {
                    if (collecSearch) {
                      return element.title
                        .toLowerCase()
                        .includes(collecSearch.toLowerCase());
                    } else {
                      return element;
                    }
                  })
                  .map((element) => {
                    return (
                      <Card
                        manga={element}
                        key={element.mal_id}
                        isUserCollectionPage={isUserCollectionPage}
                        isFriendCollectionPage={isFriendCollectionPage}
                        userInfo={userInfo}
                      />
                    );
                  })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CollectionUIDFriend;
