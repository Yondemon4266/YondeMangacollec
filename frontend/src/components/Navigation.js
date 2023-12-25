import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navigation = () => {
  const userInfo = useSelector((state) => state.userReducer.userInfo);

  return (
    <div className="navigation-menu">
      <ul className="navigation-up">
        <NavLink
          to="/"
          className={(nav) => (nav.isActive ? "nav-active hover" : "hover")}
        >
          <li id="lilogo">
            <img src="../../img/logo.png" alt="" className="logo" />
            <h2>Hinokuni</h2>
          </li>
        </NavLink>
        <NavLink
          to="/"
          className={(nav) => (nav.isActive ? "nav-active hover" : "hover")}
        >
          <li>
            <img src="../../img/news.svg" alt="news" />
            <h4>Nouveautés</h4>
          </li>
        </NavLink>
        <NavLink
          to={userInfo ? `/user/${userInfo.pseudo}/collection` : "/collection"}
          className={(nav) => (nav.isActive ? "nav-active hover" : "hover")}
        >
          <li>
            <img src="../../img/books.svg" alt="collection" />
            <h4>Collection</h4>
          </li>
        </NavLink>
        <NavLink
          to="/planning"
          className={(nav) => (nav.isActive ? "nav-active hover" : "hover")}
        >
          <li>
            <img src="../../img/calendar-filled.svg" alt="planning" />
            <h4>Planning</h4>
          </li>
        </NavLink>
        <NavLink
          to="/recherche"
          className={(nav) => (nav.isActive ? "nav-active hover" : "hover")}
        >
          <li>
            <img src="../../img/search.svg" alt="search" />
            <h4>Recherche</h4>
          </li>
        </NavLink>
      </ul>
      <div className="login">
        <NavLink
          to={userInfo ? `/user/${userInfo.pseudo}/settings` : "/users/sign_in"}
          className={(nav) => (nav.isActive ? "nav-active hover" : "hover")}
        >
          <img src="../../img/user-circle.svg" alt="" />
          {userInfo ? <h4>Compte</h4> : <h4>Se connecter</h4>}
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
