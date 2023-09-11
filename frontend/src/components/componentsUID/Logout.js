import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import axios from "axios";
const Logout = () => {
  const [isDeconnexionVisible, setDeconnexionVisible] = useState(false);

  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    localStorage.removeItem("uid");
    await axios.get( `${process.env.REACT_APP_API_URL}api/user/logout`).then(() => {
        removeCookie("jwt");
        window.location = "/";
      })
      .catch((err) => console.log(err));
    
  };
  return (
    <>
      <div className="logout" onClick={() => setDeconnexionVisible(true)}>
        Déconnexion
      </div>
      {isDeconnexionVisible && (
        <div className="islogout">
          <div className="islogout-container">
            <div className="islogout-header">
              <h4>Se déconnecter</h4>
              <p>Êtes vous sûr de vouloir vous déconnecter ?</p>
            </div>
            <div className="islogout-content">
              <button
                type="button"
                onClick={() => setDeconnexionVisible(false)}
              >
                Annuler
              </button>
              <button type="button" onClick={logout}>
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Logout;
