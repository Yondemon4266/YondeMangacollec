import React from 'react';
import { useNavigate } from 'react-router-dom';
import { dateFormater } from '../../Utils';
import SearchFriend from './SearchFriend';
import NiveauJauge from './NiveauJauge';

const CollectionUIDUserVide = ({userInfo, handleSearchCollec, isFriendCollectionPage, setCompare, allUsersData}) => {
  const navigate = useNavigate();
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
        <div className="collection-vide">
            <div className="collection-vide-container">
              <h3>Votre collection est vide</h3>
              <p>
                Pour profiter du potentiel de Yonde Mangacollec, ajoutez des
                mangas à votre collection.
              </p>
              <div className="btn-optn-card-page center">
                <div className="add-remove" style={{width:"80%"}}>
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => navigate("/recherche")}
                  >
                    <i className="fa-solid fa-plus"></i>
                    <p>Ajouter des mangas</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
          </>
    );
};

export default CollectionUIDUserVide;