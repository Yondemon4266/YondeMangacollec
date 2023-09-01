import React from "react";
import Navigation from "../../components/Navigation";
import Logout from "../../components/componentsUID/Logout";
import { useSelector } from "react-redux";

const Compte = () => {
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const dateFormater = (date) => {
    const dateSplit = date.split("T")[0];
    return dateSplit;
  };
  return (
    <>
      <Navigation />
      <div className="container">
        <div className="compte" id="compte">
          <div className="connexion">
            <strong>Compte</strong>
          </div>
          <div className="compte-info">
            <h3>Gestion du compte</h3>
            <div className="row">
              <p>Email</p>
              <h5>{userInfo && userInfo.email}</h5>
            </div>
            <div className="row">
              <p>Nom d'utilisateur</p>
              <h5>{userInfo && userInfo.pseudo}</h5>
            </div>
            <div className="row">
              <h5>Abonnement Premium</h5>
            </div>
            <div className="row">
              <h5>Paramètres avancés</h5>
            </div>
            <div className="acc-created">
              <p>
                Compte créé le {userInfo && dateFormater(userInfo.createdAt)}
              </p>
            </div>
          </div>
          <div className="themes">
            <h3>Préférences</h3>
            <div className="row">
              <h5>Thème système</h5>
            </div>
          </div>
          <div className="like-yondes-app">
            <h3>J'aime l'app ♡</h3>
            <div className="row">
              <a
                href="https://github.com/Yondemon4266"
                target="_blank noopener noreferrer"
              >
                <h5>Suivez moi sur Github !</h5>
              </a>
            </div>
          </div>
          <div className="copy">
            <p>
              Ce site est une copie de{" "}
              <a href="https://www.mangacollec.com/">Mangacollec </a>
              qui a été fait dans un but d'entraînement par Yondemon ! Si vous
              avez aimé l'application n'hésitez pas à me suivre sur{" "}
              <a
                href="https://github.com/Yondemon4266"
                target="_blank noopener noreferrer"
              >
                <i className="fa-brands fa-github"></i>
              </a>
            </p>
          </div>

          <Logout />
        </div>
      </div>
    </>
  );
};

export default Compte;
