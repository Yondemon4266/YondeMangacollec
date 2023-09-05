import React from 'react';
import Card from '../Card';

const CollectionUIDUser = ({userInfo, collecSearch, isUserCollectionPage, isFriendCollectionPage}) => {
    
    return (
        <div className="schedules">
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
    );
};

export default CollectionUIDUser;