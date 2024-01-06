import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dateFormater } from '../../Utils';
import SearchFriend from './SearchFriend';
import NiveauJauge from './NiveauJauge';
import { determineGrade } from '../../Utils';
import ExplicationTitre from '../../pages/pagesUID/ExplicationTitre';
import img from "../../assets/onizuka.jpg";
const CollectionUIDUserVide = ({
  userInfo,
  handleSearchCollec,
  isFriendCollectionPage,
  setCompare,
  allUsersData,
}) => {
  const navigate = useNavigate();
  const [isExplicationVisible, setExplicationVisible] = useState(false);
  return (
    <>
      <div className="profilUser">
        <div className="profil-container">
          <div className="imgpseudo">
            <img
              src={
                userInfo?.img
                  ? `https://server-yondemangacollec.onrender.com/images/${userInfo.img}`
                  : img
              }
              alt={`${userInfo && userInfo.pseudo}`}
            />
            <h4>{userInfo && userInfo.pseudo}</h4>
          </div>
          <div className="rightpart">
            <div className="gradeold">
              {userInfo?.universe && (
                <h5>
                  <strong>Titre : </strong>{" "}
                  {determineGrade(
                    userInfo?.level,
                    userInfo?.universe,
                    userInfo?.marineorpirate,
                    userInfo?.island,
                    userInfo?.village
                  )}{" "}
                  <i
                    className="fa-solid fa-asterisk"
                    onClick={() => setExplicationVisible(!isExplicationVisible)}
                  ></i>
                </h5>
              )}
              {isExplicationVisible && (
                <ExplicationTitre
                  setExplicationVisible={setExplicationVisible}
                />
              )}
            </div>
            <div className="niveau">
              <h5>
                <strong>Niveau :</strong>{" "}
                {Math.floor(userInfo && userInfo.level)}
              </h5>
              <NiveauJauge userInfo={userInfo} />
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
          <SearchFriend
            userInfo={userInfo}
            allUsersData={allUsersData}
            handleSearchCollec={handleSearchCollec}
          />
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
          <p id="pp">
            Pour profiter du potentiel de Yonde Mangacollec, ajoutez des mangas
            à votre collection.
          </p>
          <div className="btn-optn-card-page center">
            <div className="add-remove" style={{ width: "80%" }}>
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