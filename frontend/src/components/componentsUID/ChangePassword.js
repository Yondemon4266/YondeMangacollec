import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ChangePassword = () => {
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const [newPassword, setNewPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if ((newPassword.length > 6 && userInfo) && (newPassword !== userInfo.password) && (newPassword === controlPassword) && (oldPassword !== newPassword)) {
      const passwordError = document.querySelector(".passwordError");
      passwordError.textContent = "";
      try {
        const response = await axios({
          method: "patch",
          url: `${process.env.REACT_APP_API_URL}api/user/passwordchange/${
            userInfo && userInfo._id
          }`,
          data: { password: newPassword, oldpassword: oldPassword },
        });
        passwordError.style.color = "green";
        passwordError.textContent = "Votre password a été changé avec succès";
      } catch (err) {
        console.log(err.response.data.message);
        passwordError.style.color = "red";
        passwordError.textContent = err.response.data.message;
      }
    } else {
      const passwordError = document.querySelector(".passwordError");
      passwordError.style.color = "red";
      passwordError.textContent =
        "Les deux mots de passe entrées ne sont pas identiques.";
    }
  };
  return (
    <>
      <div
        className="row2 add-remove"
        onClick={() => setIsChangePasswordVisible(!isChangePasswordVisible)}
      >
        
        <p>Mot de passe</p>
        <h5>
            Modifier
          <i className="fa-regular fa-pen-to-square"></i>
        </h5>
        </div>
        {isChangePasswordVisible && (
          <div className="add-remove">
          <div className="fade">
            <div className="fade-container">
              <div className="fade-header">
                <h4 style={{ cursor: "auto" }}>Changement de mot de passe</h4>
                <form action="" onSubmit={(e) => handleChangePassword(e)}>
                    <input
                    type="password"
                    name="oldPassword"
                    id="oldPassword"
                    placeholder="Ancien mot de passe"
                    onChange={(e) => setOldPassword(e.target.value)}
                   />
                  <input
                    type="password"
                    name="passwordChange"
                    id="passwordChange"
                    placeholder="Nouveau mot de passe"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <input
                    type="password"
                    name="passwordControl"
                    id="passwordControl"
                    placeholder="Nouveau mot de passe"
                    onChange={(e) => setControlPassword(e.target.value)}
                  />
                  <div className="passwordError fail-success"></div>
                </form>
              </div>
              <div className="fade-content">
                <button
                  type="button"
                  onClick={(e) => {
                    setIsChangePasswordVisible(!isChangePasswordVisible);
                  }}
                >
                  Annuler
                </button>
                <button type="submit" onClick={(e) => handleChangePassword(e)}>
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

export default ChangePassword;
