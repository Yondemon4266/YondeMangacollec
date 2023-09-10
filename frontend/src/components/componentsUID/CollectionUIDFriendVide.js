import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import SearchFriend from "./SearchFriend";
import { dateFormater } from "../../Utils";
import NiveauJauge from "./NiveauJauge";
import { determineGrade } from "../../Utils";
import { phraseVillage } from "../../Utils";

const CollectionUIDFriendVide = ({
  collectionData,
  userInfo,
  allUsersData,
  handleSearchCollec,
  
}) => {
  const navigate = useNavigate();
  const { user } = useParams();
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
          <SearchFriend userInfo={userInfo} allUsersData={allUsersData} handleSearchCollec={handleSearchCollec}/>
        </div>
      </div>
      <div className="collection-vide">
        <div className="collection-vide-container">
          <h3>La collection de {user} est vide</h3>
        </div>
      </div>
    </>
  );
};

export default CollectionUIDFriendVide;
