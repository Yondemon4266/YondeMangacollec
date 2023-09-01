import React from "react";
import LogoTitle from "./LogoTitle";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <LogoTitle />
      <div className="accroche">
        <h2>Gestion de collection de manga</h2>
        <ul>
          <li>
            <img src="../../../img/square-check.svg" alt="checked" />
            <p>Ne loupez plus aucune sortie manga et animé</p>
          </li>
          <li>
            <img src="../../img/square-check.svg" alt="checked" />
            <p>Managez votre propre bibliothèque</p>
          </li>
        </ul>
        <div className="sinscrire">
          <NavLink to="/users/sign_up">
            <button className="button-sign">S'INSCRIRE</button>
          </NavLink>
        </div>
      </div>
      <ul className="apps">
        <li>
          <img
            src="./img/applewhite.png"
            alt="apple-logo"
            width="32px"
            height="32px"
          />
          <div className="app-text">
            <p>Télécharger dans</p>
            <p className="textUp">l'App Store</p>
          </div>
        </li>
        <li>
          <img
            src="./img/googleplay.png"
            width="32px"
            height="32px"
            alt="google-playstore-logo"
          />
          <div className="app-text">
            <p>Disponible sur</p>
            <p className="textUp">Google Play</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Header;
