import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/user.action";

const ChangeMail = () => {
  const dispatch = useDispatch();
  const [isChangeMailVisible, setIsChangeMailVisible] = useState(false);
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const [newMail, setNewMail] = useState("");
  const handleChangeEmail = async (e) => {
    e.preventDefault();
    if (newMail.length > 3 && userInfo && newMail !== userInfo.email) {
      const emailError = document.querySelector(".emailError");
      let changedMail = { email: newMail };
      emailError.textContent = "";
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_API_URL}api/user/emailchange/${
            userInfo && userInfo._id
          }`,
          changedMail
        );
        console.log(response);
        emailError.style.color = "green";
        emailError.textContent = "Votre email a été changé avec succès";
        dispatch(getUser(userInfo && userInfo._id));
      } catch (err) {
        console.log(err.response.data.message);
        emailError.style.color = "red";
        emailError.textContent = err.response.data.message;
      }
    } else {
      const emailError = document.querySelector(".emailError");
      emailError.style.color = "red";
      emailError.textContent =
        "Cet email n'est pas conforme ou est la même que vous avez actuellement";
    }
  };
  return (
    <>
      <div
        className="row2 add-remove"
        id="emailChange"
        onClick={() => setIsChangeMailVisible(!isChangeMailVisible)}
      >
        
        <p>Email</p>
        <h5>
          {userInfo && userInfo.email}{" "}
          <i className="fa-regular fa-pen-to-square"></i>
        </h5>
        </div>
        {isChangeMailVisible && (
          <div className="add-remove">
          <div className="fade">
            <div className="fade-container">
              <div className="fade-header">
                <h4 style={{ cursor: "auto" }}>Changement de mail</h4>
                <form action="" onSubmit={(e) => handleChangeEmail(e)}>
                  <input
                    type="email"
                    name="emailChange"
                    id="emailChange"
                    placeholder="Nouvel Email"
                    onChange={(e) => setNewMail(e.target.value)}
                  />
                  <div className="emailError fail-success"></div>
                </form>
              </div>
              <div className="fade-content">
                <button
                  type="button"
                  onClick={(e) => {
                    setIsChangeMailVisible(!isChangeMailVisible);
                  }}
                >
                  Annuler
                </button>
                <button type="submit" onClick={(e) => handleChangeEmail(e)}>
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

export default ChangeMail;
