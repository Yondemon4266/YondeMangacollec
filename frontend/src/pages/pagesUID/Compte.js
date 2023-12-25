import React, { useState } from "react";
import Navigation from "../../components/Navigation";
import Logout from "../../components/componentsUID/Logout";
import { useSelector } from "react-redux";
import { dateFormater } from "../../Utils";
import ChangeMail from "../../components/componentsUID/ChangeMail";
import ChangePseudo from "../../components/componentsUID/ChangePseudo";
import BoiteAIdees from "../../components/componentsUID/BoiteAIdees";
import ChangePassword from "../../components/componentsUID/ChangePassword";
import DeleteAccount from "../../components/componentsUID/DeleteAccount";
const Compte = () => {
  const userInfo = useSelector((state) => state.userReducer.userInfo);
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
            <ChangeMail />

            <ChangePseudo />

            <ChangePassword />

            <BoiteAIdees />

            <div className="acc-created">
              <p>
                Compte créé le{" "}
                <strong>{userInfo && dateFormater(userInfo.createdAt)}</strong>
              </p>
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
              <a
                href="https://www.mangacollec.com/"
                target="_blank noopener noreferrer"
              >
                <strong>Mangacollec</strong>{" "}
              </a>
              qui a été fait dans un but d'entraînement par Yondemon ! <br /> Si
              vous avez aimé l'application n'hésitez pas à me suivre sur{" "}
              <a
                href="https://github.com/Yondemon4266"
                target="_blank noopener noreferrer"
              >
                <i className="fa-brands fa-github"></i>
              </a>
            </p>
          </div>

          <Logout />
          <DeleteAccount />
        </div>
      </div>
    </>
  );
};

export default Compte;
