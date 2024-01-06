import React from "react";
import { useParams } from "react-router-dom";
import SearchFriend from "./SearchFriend";
import { dateFormater } from "../../Utils";
import NiveauJauge from "./NiveauJauge";
import { determineGrade } from "../../Utils";
import { phraseVillage } from "../../Utils";
import img from "../../assets/onizuka.jpg";
const CollectionUIDFriendVide = ({
  collectionData,
  userInfo,
  allUsersData,
  handleSearchCollec,
}) => {
  const { user } = useParams();
  return (
    <>
      <div className="profilUser">
        <div className="profil-container">
          <div className="imgpseudo">
            <img
              src={
                collectionData?.img
                  ? `https://server-yondemangacollec.onrender.com/images/${collectionData.img}`
                  : img
              }
              alt={`${collectionData?.pseudo}`}
            />
            <h4>{collectionData?.pseudo}</h4>
          </div>
          <div className="rightpart">
            <div className="gradeold">
              <h5>
                <strong>Titre :</strong>{" "}
                {determineGrade(collectionData && collectionData.level)}{" "}
                {phraseVillage(collectionData && collectionData.village)}{" "}
                {collectionData && collectionData.village}
              </h5>
            </div>
            <div className="niveau">
              <h5>
                <strong>Niveau :</strong>{" "}
                {Math.floor(collectionData && collectionData.level)}
              </h5>
              <NiveauJauge userInfo={collectionData} />
            </div>
            <div className="membredepuis">
              <h5>
                <strong>Membre depuis le :</strong>{" "}
                {collectionData && dateFormater(collectionData.createdAt)}
              </h5>
            </div>
          </div>
        </div>
        <div className="badges"></div>
        <div className="utility-bar">
          <SearchFriend
            userInfo={userInfo}
            allUsersData={allUsersData}
            handleSearchCollec={handleSearchCollec}
          />
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
