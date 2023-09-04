import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import AddInfosCardPage from "../components/componentsUID/AddInfosCardPage";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUser } from "../actions/user.action";
import Popularity from "../components/Popularity";

const CardPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isUserCollectionCardPage = location.pathname.startsWith("/cardpage/user");
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const navigate = useNavigate();
  const { mal_id } = useParams();
  const manga = location.state && location.state.manga;
  const [isRemoveVisible, setRemoveVisible] = useState(false);
  const [isRemoveConfirmed, setRemoveConfirmed] = useState(false);

  const addAndRemoveCollection = async (element) => {
    if (userInfo) {
      const elementNotInColleclist =
        userInfo.colleclist.find((el) => el.mal_id === element.mal_id) ===
        undefined;

      if (elementNotInColleclist) {
        const updatedColleclist = [...userInfo.colleclist, element];

        console.log(updatedColleclist);
        const updatedData = {
          colleclist: updatedColleclist,
        };
        const response = await axios.patch(
          `${process.env.REACT_APP_API_URL}api/user/colleclistpatch/${userInfo._id}`,
          updatedData
        );
        console.log(response);
        await dispatch(getUser(userInfo._id));
      } else {
        if (isRemoveConfirmed) {
          console.log("suppression");
          setRemoveVisible(false);
          await axios.delete(
            `${process.env.REACT_APP_API_URL}api/user/colleclistdelete/${userInfo._id}/${element.mal_id}`
          );
          await dispatch(getUser(userInfo._id));
        } else {
          setRemoveVisible(true);
          setRemoveConfirmed(true);
        }
      }
    } else {
      navigate("/users/sign_in");
    }
  };

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
              <img
                src={manga ? manga.images.webp.large_image_url : null}
                alt={manga ? manga.title : null}
              />
            </div>
          </div>
          <div className="right-card-page">
            <div className="title-card-page">
              <h2>{manga.title_english ? manga.title_english : manga.title}</h2>
            </div>
            <>
              {userInfo &&
              userInfo.colleclist.find((p) => p.mal_id === manga.mal_id) ? (
                <div className="btn-optn-card-page">
                  <div className="add-remove">
                    <button
                      className="btn-remove"
                      id="btn-remove"
                      onClick={() => addAndRemoveCollection(manga)}
                    >
                      <i className="fa-solid fa-check" id="i-btn-add"></i>
                      <p id="p-btn-add">COLLEC</p>
                    </button>
                    <p>
                      Ajouté par <strong> 212 personnes</strong>
                    </p>
                  </div>
                  <div className="mal-stars">
            <Popularity manga={manga}/>
            </div>
                  {isRemoveVisible && (
                    <div className="fade">
                      <div className="fade-container">
                        <div className="fade-header">
                          <h4>Supprimer</h4>
                          <p>
                            Êtes vous sûr de vouloir supprimer cet élément de
                            votre collection ?
                          </p>
                        </div>
                        <div className="fade-content">
                          <button
                            type="button"
                            onClick={() => setRemoveVisible(false)}
                          >
                            Annuler
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              addAndRemoveCollection(manga);
                            }}
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="btn-optn-card-page">
                  <div className="add-remove">
                    <button
                      className="btn-add"
                      id="btn-add"
                      onClick={() => addAndRemoveCollection(manga)}
                    >
                      <i className="fa-solid fa-plus" id="i-btn-add"></i>
                      <p id="p-btn-add">AJOUTER</p>
                    </button>
                    <p>
                      Ajouté par <strong> 212 personnes</strong>
                    </p>
                  </div>
                  <div className="mal-stars">
            <Popularity manga={manga}/>
            </div>
                </div>
              )}
            </>
            <div className="synopsis">
              {manga.synopsis ? <h4>Résumé</h4> : null}
              <p>{manga.synopsis ? manga.synopsis : null}</p>
            </div>
            {isUserCollectionCardPage && <AddInfosCardPage manga={manga}/>}
          </div>
        </div>
        
      </div>
    </>
  );
};

export default CardPage;
