import React from "react";
import { NavLink } from "react-router-dom";

const ChooseToSign = () => {
  return (
    <div className="choose-to-sign">
      <div className="connexion">
        <h4>Connexion</h4>
      </div>
      <div className="cts-container">
        <div className="choose-to-sign-container">
          <p>
            Connectez-vous avec votre compte YondeMangaAnime pour gérer votre
            collection de mangas et d'animes.
          </p>
          <NavLink to="/users/sign_in">
            <button className="button-sign">SE CONNECTER</button>
          </NavLink>
          <p>Pas encore de compte ? L'inscription est rapide et gratuite !</p>
          <NavLink to="/users/sign_up">
            <button className="button-sign">S'INSCRIRE</button>
          </NavLink>
        </div>
      </div>
      <div className="mentions-legales">
        <NavLink to="/mentions_legales">
          <p>Mentions légales</p>
        </NavLink>
      </div>
    </div>
  );
};

export default ChooseToSign;
