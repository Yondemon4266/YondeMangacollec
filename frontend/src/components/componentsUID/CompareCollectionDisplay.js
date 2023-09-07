import React from 'react';
import Card from '../Card';
import { useParams } from 'react-router-dom';

const CompareCollectionDisplay = ({compareList, isFriendCollectionPage, isCompare, collecSearch, handleSearchCollec, userInfo}) => {
 
    let { user } = useParams();
    return (
        <>
              <div className="schedule-day-container">
                <div className="common-list schedule-day-list">
                  <div className="listtitle"><p>Éléments en commun</p></div>
                  <div className="listmangas">
                  {compareList.common.filter((element) => {
                      if (collecSearch) {
                        return element.title
                          .toLowerCase()
                          .includes(collecSearch.toLowerCase());
                      } else {
                        return element;
                      }
                    }).map((element) => (
                    <Card key={element.mal_id} manga={element} isFriendCollectionPage={isFriendCollectionPage} isCompare={isCompare}/>
                  ))}
                  </div>
                </div>
                <div className="difference-friend-list schedule-day-list">
                <div className="listtitle"><p>Éléments en plus de {user}</p></div>
                <div className="listmangas">
                {compareList.differentFriend.filter((element) => {
                      if (collecSearch) {
                        return element.title
                          .toLowerCase()
                          .includes(collecSearch.toLowerCase());
                      } else {
                        return element;
                      }
                    }).map((element) => (
                    <Card key={element.mal_id} manga={element} isFriendCollectionPage={isFriendCollectionPage} isCompare={isCompare}/>
                  ))}
                </div>
                  
                </div>
                <div className="difference-user-list schedule-day-list">
                <div className="listtitle"><p>Éléments en plus de {userInfo && userInfo.pseudo}</p></div>
                <div className="listmangas">
                {compareList.differentUser.filter((element) => {
                      if (collecSearch) {
                        return element.title
                          .toLowerCase()
                          .includes(collecSearch.toLowerCase());
                      } else {
                        return element;
                      }
                    }).map((element) => (
                    <Card key={element.mal_id} manga={element} isCompare={isCompare}/>
                  ))}
                </div>
                  
                </div>
              </div>
            </>
    );
};

export default CompareCollectionDisplay;