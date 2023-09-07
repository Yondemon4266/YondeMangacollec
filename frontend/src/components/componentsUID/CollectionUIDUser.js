import React from 'react';
import Card from '../Card';
import { dateFormater } from '../../Utils';
import SearchFriend from './SearchFriend';
import NiveauJauge from './NiveauJauge';


const CollectionUIDUser = ({userInfo, collecSearch, isUserCollectionPage, isFriendCollectionPage, handleSearchCollec, allUsersData, isCompare, setCompare}) => {
  console.log(isCompare);
    return (
      <>
      <div className="profilUser">
          <div className="profil-container">
            <div className="imgpseudo">
              <img
                src={`../../../${userInfo && userInfo.picture}`}
                alt={`image de ${userInfo && userInfo.pseudo}`}
              />
              <h4>{userInfo && userInfo.pseudo}</h4>
            </div>
            <div className="rightpart">
            <div className="gradeold">
              <h5>Titre : Vétéran Kage</h5>
            </div>
            <div className="niveau">
              <h5>Niveau : {Math.floor(userInfo && userInfo.level)}</h5>
              <NiveauJauge userInfo={userInfo}/>
            </div>
            <div className="membredepuis">
              <h5>
                Membre depuis le :{" "}
                {userInfo && dateFormater(userInfo.createdAt)}
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
            {isFriendCollectionPage && (
              <button
                type="button"
                id="compareBtn"
                onClick={() => setCompare(true)}
              >
                Comparez vos collections !
              </button>
            )}
          </div>
        </div>
        <div className="schedules" id='scheds'>
            <div className="schedule-day-container">
              <div className="schedule-day-list">
                {userInfo &&
                  userInfo.colleclist
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
          </div>
          </>
    );
};

export default CollectionUIDUser;