import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Popularity from "../Popularity";
import { getUser, getLevelMessage } from "../../actions/user.action";

const AddRemoveCollectionComponent = ({
  userInfo,
  manga,
  isRemoveConfirmed,
  setRemoveConfirmed,
  isRemoveVisible,
  setRemoveVisible,
  isUserCollectionCardPage,
  isUserCardPage,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const addAndRemoveCollection = async (element) => {
    if (userInfo) {
      const elementNotInColleclist =
        userInfo.colleclist.find((el) => el.mal_id === element.mal_id) ===
        undefined;
      if (elementNotInColleclist) {

        const updatedData = {
          colleclist: element,
        };
        const response = await axios.patch(
          `${process.env.REACT_APP_API_URL}api/user/colleclistpatch/${userInfo._id}`,
          updatedData
        );
        const responselevel = await axios.patch(`${process.env.REACT_APP_API_URL}api/user/colleclistleveladdpatch/${userInfo._id}`);
        dispatch(getLevelMessage(responselevel.data.message));
        await dispatch(getUser(userInfo._id));
      } else {
        if (isRemoveConfirmed) {
          if (isUserCardPage) {
            setRemoveVisible(false);
            await axios.delete(
              `${process.env.REACT_APP_API_URL}api/user/colleclistdelete/${userInfo._id}/${element.mal_id}`
            );
            const responselevel = await axios.patch(`${process.env.REACT_APP_API_URL}api/user/colleclistlevelremovepatch/${userInfo._id}`);
            dispatch(getLevelMessage(responselevel.data.message));
            await dispatch(getUser(userInfo._id));
            setRemoveConfirmed(false);
          } else if (isUserCollectionCardPage) {
            navigate(-1);

            await axios.delete(
              `${process.env.REACT_APP_API_URL}api/user/colleclistdelete/${userInfo._id}/${element.mal_id}`
            );
            const responselevel = await axios.patch(`${process.env.REACT_APP_API_URL}api/user/colleclistlevelremovepatch/${userInfo._id}`);
            dispatch(getLevelMessage(responselevel.data.message));
            await dispatch(getUser(userInfo._id));
            setRemoveVisible(false);
            setRemoveConfirmed(false);
          }
        } else {
          setRemoveVisible(true);
          setRemoveConfirmed(true);
        }
      }
    } else {
      navigate("/users/sign_in");
    }
  };

  return (
    <>
      {userInfo &&
      userInfo.colleclist.find((p) => p.mal_id === manga.mal_id) ? (
        <div className="add-remove">
          <button
            className="btn-remove"
            id="btn-remove"
            onClick={() => addAndRemoveCollection(manga)}
          >
            <i className="fa-solid fa-check" id="i-btn-add"></i>
            <p id="p-btn-add">COLLEC</p>
          </button>
          <p>
            Ajouté par <strong> 212 personnes</strong>
          </p>
          {isRemoveVisible && (
            <div className="fade">
              <div className="fade-container">
                <div className="fade-header">
                  <h4>Supprimer</h4>
                  <p>
                    Êtes vous sûr de vouloir supprimer cet élément de votre
                    collection ?
                  </p>
                </div>
                <div className="fade-content">
                  <button
                    type="button"
                    onClick={() => {
                      setRemoveVisible(false);
                      setRemoveConfirmed(false);
                    }}
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      addAndRemoveCollection(manga);
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="add-remove">
          <button
            className="btn-add"
            id="btn-add"
            onClick={() => addAndRemoveCollection(manga)}
          >
            <i className="fa-solid fa-plus" id="i-btn-add"></i>
            <p id="p-btn-add">AJOUTER</p>
          </button>
          <p>
            Ajouté par <strong> 212 personnes</strong>
          </p>
        </div>
      )}
    </>
  );
};

export default AddRemoveCollectionComponent;
