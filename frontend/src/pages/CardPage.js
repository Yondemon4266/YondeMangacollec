import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import AddInfosCardPage from "../components/AddInfosCardPage";

const CardPage = (props) => {
  const navigate = useNavigate();
  const { mal_id } = useParams();
  const location = useLocation();
  const manga = location.state && location.state.manga;
  console.log(manga);

  const leftCardPageStyle = {
    background: `url(${manga.images.webp.large_image_url}) center/cover`,
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
          <div className="left-card-page" style={leftCardPageStyle}>
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
            <div className="btn-optn-card-page">
              <div className="add">
                <button className="btn-add">
                  <i className="fa-solid fa-plus"></i>
                  AJOUTER
                </button>
                <p>
                  Ajouté par <strong> 212 personnes</strong>
                </p>
              </div>
              <div className="like">
                <button className="btn-like">
                  <i className="fa-regular fa-heart"></i>
                  SUIVRE
                </button>
                <p>
                  Suivi par <strong>4 208</strong> personnes
                </p>
              </div>
            </div>
            <div className="synopsis">
              {manga.synopsis ? (<h4>Résumé</h4>) : null}
              <p>{manga.synopsis ? manga.synopsis : null}</p>
            </div>
            <AddInfosCardPage mal_id={mal_id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPage;
