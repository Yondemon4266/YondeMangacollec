import React, { useState } from "react";
import cookie from "js-cookie";
import axios from "axios";
import { useSelector } from "react-redux";
import "../../style/layouts/_settings.scss";
const DeleteAccount = () => {
  const [isDeleteVisible, setDeleteVisible] = useState(false);
  const [msgErrors, setMsgErrors] = useState({ error: "", success: "" });
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const DeleteAcc = async () => {
    try {
      localStorage.removeItem("uid");
      const response = await axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}api/user/delete/${
          userInfo && userInfo._id
        }`,
        withCredentials: true,
      });
      setMsgErrors((prev) => ({
        ...prev,
        error: "",
        success: "Votre compte a été supprimé avec succès !",
      }));
      setTimeout(() => {
        removeCookie("jwt");
        console.log("ok");
        window.location = "/";
      }, 2000);
    } catch (error) {
      console.log(error);
      setMsgErrors((prev) => ({
        ...prev,
        error: "Erreur serveur...",
        success: "",
      }));
    }
  };

  return (
    <>
      <div className="logout" onClick={() => setDeleteVisible(true)}>
        Suppression du compte
      </div>
      {isDeleteVisible && (
        <div className="islogout decal">
          <div className="islogout-container">
            <div className="islogout-header">
              <h4>Supprimer votre compte</h4>
              <p>
                Êtes vous sûr de vouloir supprimer votre compte définitivement ?
              </p>
            </div>
            <div className="islogout-content">
              <button type="button" onClick={() => setDeleteVisible(false)}>
                Annuler
              </button>
              <button type="button" onClick={() => DeleteAcc()}>
                Confirmer
              </button>
            </div>
            <div className="fail">
              {msgErrors.error ? msgErrors.error : null}
            </div>
            <div className=" success">
              {msgErrors.success ? msgErrors.success : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteAccount;
