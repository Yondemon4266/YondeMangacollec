import React, { useState } from "react";
import Navigation from "../../components/Navigation";
import Logout from "../../components/componentsUID/Logout";
import { useSelector } from "react-redux";
import { dateFormater } from "../../Utils";
import ChangeMail from "../../components/componentsUID/ChangeMail";
import ChangePseudo from "../../components/componentsUID/ChangePseudo";
import BoiteAIdees from "../../components/componentsUID/BoiteAIdees";
const Compte = () => {
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const [isChangeMailVisible, setIsChangeMailVisible] = useState(false);
  const [isChangePseudoVisible, setIsChangePseudoVisible] = useState(false);
  const [isBoiteVisible, setIsBoiteVisible] = useState(false);

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
            <div className="row2 add-remove" id="emailChange" onClick={() => setIsChangeMailVisible(true)}>
              <p>Email</p>
              <h5>{userInfo && userInfo.email} <i className="fa-regular fa-pen-to-square"></i></h5>
              {isChangeMailVisible && <ChangeMail isChangeMailVisible={isChangeMailVisible} setIsChangeMailVisible={setIsChangeMailVisible}/>}
            </div>
            <div className="row2 add-remove" id="pseudoChange" onClick={() => setIsChangePseudoVisible(true)}>
              <p>Nom d'utilisateur</p>
              <h5>{userInfo && userInfo.pseudo} <i className="fa-regular fa-pen-to-square"></i></h5>
              {isChangePseudoVisible && <ChangePseudo isChangePseudoVisible={isChangePseudoVisible} setIsChangePseudoVisible={setIsChangePseudoVisible}/>}
            </div>
            <div className="row add-remove" onClick={() => setIsBoiteVisible(true)}>
              <h5>Boîte à idées</h5>
              {isBoiteVisible && <BoiteAIdees isBoiteVisible={isBoiteVisible} setIsBoiteVisible={setIsBoiteVisible}/>}
            </div>
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
              <a href="https://www.mangacollec.com/" target="_blank noopener noreferrer"><strong>Mangacollec</strong> </a>
              qui a été fait dans un but d'entraînement par Yondemon ! <br/> Si vous
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
