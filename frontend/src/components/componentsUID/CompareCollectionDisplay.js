import React from 'react';
import Card from '../Card';
import { useParams } from 'react-router-dom';

const CollectionUIDFriend = ({compareList, isFriendCollectionPage}) => {
 
    let { user } = useParams();
    return (
        <div className="schedules">
              <div className="schedule-day-container">
                <div className="common-list schedule-day-list">
                  {compareList.common.map((element) => (
                    <Card key={element.mal_id} manga={element} isFriendCollectionPage={isFriendCollectionPage}/>
                  ))}
                </div>
                <div className="difference-friend-list schedule-day-list">
                  {compareList.differentFriend.map((element) => (
                    <Card key={element.mal_id} manga={element}/>
                  ))}
                </div>
                <div className="difference-user-list schedule-day-list">
                  {compareList.differentUser.map((element) => (
                    <Card key={element.mal_id} manga={element}/>
                  ))}
                </div>
              </div>
            </div>
    );
};

export default CollectionUIDFriend;