import React from 'react';
import Card from '../Card';
import { dateFormater } from '../../Utils';
import SearchFriend from './SearchFriend';
import NiveauJauge from './NiveauJauge';
import { determineGrade } from '../../Utils';
import { useDispatch } from 'react-redux';
import { getCompareState } from '../../actions/user.action';


const CollectionUIDUser = ({userInfo, collecSearch, isUserCollectionPage, isFriendCollectionPage, handleSearchCollec, allUsersData, isCompare, setCompare}) => {
  const dispatch = useDispatch();
    return (
      <>
      <div className="profilUser">
          <div className="profil-container">
            <div className="imgpseudo">
              <img
                src={`../../../${userInfo && userInfo.picture}`}
                alt={`${userInfo && userInfo.pseudo}`}
              />
              <h4>{userInfo && userInfo.pseudo}</h4>
            </div>
            <div className="rightpart">
            <div className="gradeold">
             <h5><strong>Titre :</strong> {determineGrade(userInfo && userInfo.level)} du village caché du {userInfo && userInfo.village}</h5>
            </div>
            <div className="niveau">
              <h5><strong>Niveau :</strong>{Math.floor(userInfo && userInfo.level)}</h5>
              <NiveauJauge userInfo={userInfo}/>
            </div>
            <div className="membredepuis">
              <h5>
                <strong>Membre depuis le :</strong>{" "}
                {userInfo && dateFormater(userInfo.createdAt)}
              </h5>
            </div>
            </div>
           
          </div>
          <div className="badges"></div>
          <div className="utility-bar">
            <SearchFriend userInfo={userInfo} allUsersData={allUsersData} handleSearchCollec={handleSearchCollec} />
            {isFriendCollectionPage && (
              <button
                type="button"
                id="compareBtn"
                onClick={() => {setCompare(true);
                  dispatch(getCompareState(isCompare));
                }}
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