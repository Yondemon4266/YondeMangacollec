import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navigation from "../../components/Navigation";
import Card from "../../components/Card";
import { useLocation, useNavigate } from "react-router-dom";

const CollectionUID = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isUserCollectionPage = location.pathname.startsWith("/user/");
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const [collecSearch, setCollecSearch] = useState(null);

  const handleSearchCollec = (e) => {
    let newSearch = e.target.value;
    setCollecSearch(newSearch);
  };
  const collectionData = userInfo && userInfo.colleclist;

  return (
    <>
      <Navigation />
      <div className="container">
        <div className="connexion">
          <div className="searchinput">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="search"
              name="search-collec"
              id="search-collec"
              placeholder="Rechercher dans la collection"
              style={{ width: "40%" }}
              onChange={(e) => handleSearchCollec(e)}
            />
          </div>
        </div>
        {userInfo && Object.keys(userInfo.colleclist).length > 0 ? (
          <div className="schedules">
            <div className="schedule-day-container">
              <div className="schedule-day-list">
                {collectionData
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
                        userInfo={userInfo}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        ) : (
          <div className="collection-vide">
            <div className="collection-vide-container">
              <h3>Votre collection est vide</h3>
              <p>
                Pour profiter du potentiel de Yonde Mangacollec, ajoutez des
                mangas à votre collection.
              </p>
              <div className="btn-optn-card-page center">
                <div className="add-remove">
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
        )}
      </div>
    </>
  );
};

export default CollectionUID;
