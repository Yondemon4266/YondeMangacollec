import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import AddInfosCardPage from "../components/componentsUID/AddInfosCardPage";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUser } from "../actions/user.action";
import Popularity from "../components/Popularity";
import AddRemoveCollectionComponent from "../components/componentsUID/AddRemoveCollectionComponent";

const CardPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const isUserCollectionCardPage = location.pathname.startsWith(
    `/cardpage/user:${userInfo && userInfo.pseudo}/`
  );
  const manga = location.state && location.state.manga;
  const isFriendCollectionPage =
    location.state && location.state.isFriendCollectionPage;

  const isUserCardPage = location.pathname.startsWith("/cardpage/g");
  const [isRemoveVisible, setRemoveVisible] = useState(false);
  const [isRemoveConfirmed, setRemoveConfirmed] = useState(false);

  return (
    <>
      <Navigation />
      <div className="cardpage container">
        <div className="connexion">
          <div className="retour" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-arrow-left"></i>
          </div>
        </div>
        <div className="cardpageall">
          <div
            className="left-card-page"
            style={{
              background: `url(${manga.images.webp.large_image_url}) center/cover`,
            }}
          >
            <div className="img-container-cp">
              <div className="img-container">
                <img
                  src={manga ? manga.images.webp.large_image_url : null}
                  alt={manga ? manga.title : null}
                />
              </div>
            </div>
          </div>
          <div className="right-card-page">
            <div className="title-card-page">
              <h2>{manga.title_english ? manga.title_english : manga.title}</h2>
            </div>
            {isUserCollectionCardPage || isUserCardPage ? (
              <div className="btn-optn-card-page">
                <AddRemoveCollectionComponent
                  userInfo={userInfo}
                  manga={manga}
                  isRemoveConfirmed={isRemoveConfirmed}
                  setRemoveConfirmed={setRemoveConfirmed}
                  isRemoveVisible={isRemoveVisible}
                  setRemoveVisible={setRemoveVisible}
                  isUserCollectionCardPage={isUserCollectionCardPage}
                  isUserCardPage={isUserCardPage}
                />
                <div className="mal-stars">
                  <Popularity manga={manga} />
                </div>
              </div>
            ) : (
              <div className="btn-optn-card-page">
                <div className="mal-stars">
                  <Popularity manga={manga} />
                </div>
              </div>
            )}

            <div className="synopsis">
              {manga.synopsis ? <h4>Résumé</h4> : null}
              <p>{manga.synopsis ? manga.synopsis : null}</p>
            </div>
            {isUserCollectionCardPage && (
              <AddInfosCardPage
                manga={manga}
                isFriendCollectionPage={isFriendCollectionPage}
                isUserCollectionCardPage={isUserCollectionCardPage}
              />
            )}
            {isFriendCollectionPage && (
              <AddInfosCardPage
                manga={manga}
                isFriendCollectionPage={isFriendCollectionPage}
                isUserCollectionCardPage={isUserCollectionCardPage}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPage;
