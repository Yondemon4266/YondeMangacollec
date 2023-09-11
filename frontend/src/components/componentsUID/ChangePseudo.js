import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/user.action";

const ChangePseudo = () => {
  const dispatch = useDispatch();
  const [isChangePseudoVisible, setIsChangePseudoVisible] = useState(false);
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const [newPseudo, setNewPseudo] = useState(null);
  
  const handleChangePseudo = async (e) => {
    e.preventDefault();
    if (newPseudo && userInfo && newPseudo !== userInfo.pseudo) {
      const pseudoError = document.querySelector(".pseudoError");
      let changedPseudo = { pseudo: newPseudo };
      pseudoError.textContent = "";
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_API_URL}api/user/pseudochange/${
            userInfo && userInfo._id
          }`,
          changedPseudo
        );
        console.log(response);
        pseudoError.style.color = "green";
        pseudoError.textContent = "Votre pseudo a été changé avec succès";
        dispatch(getUser(userInfo && userInfo._id));
      } catch (err) {
        console.log(err.response.data.message);
        pseudoError.style.color = "red";
        pseudoError.textContent = err.response.data.message;
      }
    } else {
      const pseudoError = document.querySelector(".pseudoError");
      pseudoError.style.color = "red";
      pseudoError.textContent =
        "Ce pseudo est le même que vous avez actuellement ou est vide";
    }
  };
  return (
    <>
      <div
        className="row2 add-remove"
        onClick={(e) => {
          setIsChangePseudoVisible(!isChangePseudoVisible);
          e.stopPropagation();}}
      >
        <p>Nom d'utilisateur</p>
        <h5>
          {userInfo && userInfo.pseudo}{" "}
          <i className="fa-regular fa-pen-to-square"></i>
        </h5>
        </div>
        {isChangePseudoVisible && (
          <div className="add-remove">

         
          <div className="fade">
            <div className="fade-container">
              <div className="fade-header">
                <h4 style={{ cursor: "auto" }}>Changement de pseudo</h4>
                <form action="" onSubmit={(e) => handleChangePseudo(e)}>
                  <input
                    type="text"
                    name="pseudoChange"
                    id="pseudoChange"
                    placeholder="Nouveau pseudo"
                    onChange={(e) => setNewPseudo(e.target.value)}
                  />
                  <div className="pseudoError fail-success"></div>
                </form>
              </div>
              <div className="fade-content">
                <button
                  type="button"
                  onClick={(e) => {setIsChangePseudoVisible(!isChangePseudoVisible);
                  e.stopPropagation();}}
                >
                  Annuler
                </button>
                <button type="submit" onClick={(e) => handleChangePseudo(e)}>
                  Confirmer
                </button>
              </div>
            </div>
          </div>
          </div>
        )}
    
    </>
  );
};

export default ChangePseudo;
