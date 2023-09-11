import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const BoiteAIdees = () => {
  const [isBoiteVisible, setIsBoiteVisible] = useState(false);
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const [newIdee, setNewIdee] = useState(null);
  const handleSendIdea = async (e) => {
    e.preventDefault();
    if (newIdee) {
      const ideeError = document.querySelector(".ideeError");
      let idea = { idea: newIdee };
      ideeError.textContent = "";
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_API_URL}api/user/sendidea/${
            userInfo && userInfo._id
          }`,
          idea
        );
        console.log(response);
        ideeError.style.color = "green";
        ideeError.textContent =
          "Votre idée a été envoyée avec succès ! Je prendrais en compte toutes vos idées, merci pour votre contribution 😁";
      } catch (err) {
        console.log(err.response.data.message);
        ideeError.style.color = "red";
        ideeError.textContent =
          "Il y a eu un problème avec le serveur, désolé pour l'inconvénience";
      }
    } else {
      const ideeError = document.querySelector(".ideeError");
      ideeError.style.color = "red";
      ideeError.textContent =
        "Il y a eu un problème avec le serveur, désolé pour l'inconvénience";
    }
  };
  return (
    <>
    
      <div className="row add-remove" onClick={() => setIsBoiteVisible(!isBoiteVisible)}>
        <h5>Boîte à idées</h5>
        </div>
    {isBoiteVisible && <div className="add-remove">
      <div className="fade">
        <div className="fade-container">
          <div className="fade-header">
            <h4 style={{ cursor: "auto" }}>Boîte à idées</h4>
            <form action="" onSubmit={(e) => handleSendIdea(e)}>
              <textarea
                placeholder="N'hésitez pas à me partager vos idées, toute aide est la bienvenue !"
                onChange={(e) => setNewIdee(e.target.value)}
              />
              <div className="ideeError fail-success"></div>
            </form>
          </div>
          <div className="fade-content">
            <button type="button" onClick={() => setIsBoiteVisible(!isBoiteVisible)}>
              Annuler
            </button>
            <button type="submit" onClick={(e) => handleSendIdea(e)}>
              Confirmer
            </button>
          </div>
        </div>
      </div>
      </div>}
      
      
    </>
  );
};

export default BoiteAIdees;
