import React from "react";
import Card from "../Card";
import { useParams } from "react-router-dom";
import { dateFormater, phraseVillage, determineGrade } from "../../Utils";
import SearchFriend from "./SearchFriend";
import CompareCollectionDisplay from "./CompareCollectionDisplay";
import NiveauJauge from "./NiveauJauge";
import { useDispatch, useSelector } from "react-redux";
import { getCompareState } from "../../actions/user.action";



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
  const dispatch = useDispatch();
  const compareState = useSelector((state) => state.userReducer.isCompare);

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
              <h5>Titre : {determineGrade(collectionData && collectionData.level)} {phraseVillage(collectionData && collectionData.village)} {collectionData && collectionData.village}</h5>
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
          <SearchFriend userInfo={userInfo} allUsersData={allUsersData} handleSearchCollec={handleSearchCollec} />
          {isFriendCollectionPage && (compareState === false) && (
            <button
              type="button"
              id="compareBtn"
              onClick={() =>{dispatch(getCompareState(true));
              setCompare(true);}}
            >
              Comparez vos collections !
            </button>
          )}
          {isFriendCollectionPage && (compareState === true) && (<button
              type="button"
              id="compareBtn"
              onClick={() => {dispatch(getCompareState(false));
              setCompare(false);}}
            >
              Annuler la comparaison
            </button>)}
        </div>
      </div>
      <div className="schedules" id="scheds">
        {(isCompare || compareState )? (
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
