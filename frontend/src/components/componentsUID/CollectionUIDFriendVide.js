import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import SearchFriend from "./SearchFriend";
import { dateFormater } from "../../Utils";
import NiveauJauge from "./NiveauJauge";

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
