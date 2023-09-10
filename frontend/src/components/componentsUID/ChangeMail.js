import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const ChangeMail = ({ setIsChangeMailVisible, isChangeMailVisible }) => {

    const userInfo = useSelector((state) => state.userReducer.userInfo);
    const [newMail, setNewMail] = useState(null);
    const emailError = document.querySelector('.emailError');
   const handleChangeEmail = async (e) => {
    e.preventDefault();
    if (newMail.length > 3 && (userInfo && newMail !== userInfo.email)) {
        let changedMail = {email: newMail};
        emailError.textContent = "";
        try {

            const response = await axios.patch(`${process.env.REACT_APP_API_URL}api/user/emailchange/${userInfo && userInfo._id}`, changedMail);
            console.log(response);
            emailError.style.color = "green";
            emailError.textContent = "Votre email a été changé avec succès";
        } catch (err) {
            console.log(err.response.data.message);
            emailError.style.color = "red";
            emailError.textContent = err.response.data.message;
        }
    } else {
        emailError.style.color = "red";
        emailError.textContent = "Cet email est la même que vous avez actuellement";
    }
   } 
  return (
    <>
      <div className="fade">
        <div className="fade-container">
          <div className="fade-header">
            <h4 style={{cursor:"auto"}}>Changement de mail</h4>
            <form action="" onSubmit={(e) => handleChangeEmail(e)}>
            <input type="email" name="emailChange" id="emailChange" placeholder="Nouvel Email" onChange={(e) => setNewMail(e.target.value)}/>
            <div className="emailError fail-success"></div>
            </form>
          </div>
          <div className="fade-content">
            <button type="button" onClick={() => setIsChangeMailVisible(false)}>Annuler</button>
            <button type="submit" onClick={(e) => handleChangeEmail(e)}>Confirmer</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeMail;
