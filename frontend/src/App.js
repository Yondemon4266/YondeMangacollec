import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Planning from "./pages/Planning";
import Recherche from "./pages/Recherche";
import SignIn from "./Log/SignIn";
import SignUp from "./Log/SignUp";
import CardPage from "./pages/CardPage";
import SearchPage from "./pages/SearchPage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllUsers, getUser } from "./actions/user.action";
import CollectionUID from "./pages/pagesUID/CollectionUID";
import Compte from "./pages/pagesUID/Compte";
import ExplicationTitre from "./pages/pagesUID/ExplicationTitre";
const App = () => {

  
  const dispatch = useDispatch();

  const [uid, setUid] = useState(
    JSON.parse(localStorage.getItem("uid"))
      ? JSON.parse(localStorage.getItem("uid"))
      : null
  );

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        await dispatch(getAllUsers());
      } catch (err) {
        console.log("Pas pu récupérer tous les utilisateurs" + err);
      }
    };
    fetchAllUsers();
  }, []);


  ////////////// FETCHTOKEN ////////////////////////
  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          if (uid) {
            console.log("token déjà valide");
          } else {
            setUid(res.data);
            localStorage.setItem("uid", JSON.stringify(res.data));
          }
        })
        .catch((err) => console.log(err + "  No token !"));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid]);

  ////////////////UID ET FETCHTOKEN ////////////////////////

  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="*" element={<Home />} />
      <Route path="/planning" element={<Planning />} />
      <Route path="/recherche" element={<Recherche />} />
      <Route path="/cardpage/:cardId" element={<CardPage />} />
      <Route path="/recherche/:searchId" element={<SearchPage />} />
      {/* Routes privées */}
      {uid ? (
        <>
          <Route path="/user/:user/collection" element={<CollectionUID />} />
          <Route path="/user/:user/settings" element={<Compte />} />
          <Route path="/cardpage/:user/:malid" element={<CardPage />} />
          <Route path="/users/sign_in" element={<Navigate to="/" />} />
          <Route path="/users/sign_up" element={<Navigate to="/" />} />
          <Route path="/collection" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          {/* Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié */}
          <Route
            path="/user/:user/collection"
            element={<Navigate to="/users/sign_in" />}
          />
          <Route
            path="/user/:user/settings"
            element={<Navigate to="/users/sign_in" />}
          />
          <Route path="/cardpage/:user/:malid" element={<Navigate to="/users/sign_in" />} />
          <Route path="/users/sign_in" element={<SignIn />} />
          <Route path="/users/sign_up" element={<SignUp />} />
          <Route path="/collection" element={<Collection />} />
        </>
      )}
    </Routes>
  );
};

export default App;
