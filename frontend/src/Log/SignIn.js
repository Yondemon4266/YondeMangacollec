import React, { useState } from "react";
import Navigation from "../components/Navigation";
import SignInSignUp from "../components/SignInSignUp";
import axios from "axios";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    if (email && password.length >= 6) {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/login`,
        withCredentials: true,
        data: {
          email,
          password,
        },
      })
        .then((res) => {
          window.location = "/";
        })
        .catch((err) => {
          console.log(err);
          emailError.innerHTML = err.response.data.errors.email;
          passwordError.innerHTML = err.response.data.errors.password;
        });
    } else {
      emailError.innerHTML = "Veuillez renseigner votre email";
      passwordError.innerHTML =
        "La longueur du mot de passe doit être supérieur à 6 caractères";
    }
  };


  return (
    <>
      <Navigation />
      <div className="sign container">
        <SignInSignUp />
        <form action="" onSubmit={(e) => handleLogin(e)} id="sign-in-form">
          <h1>CONNEXION</h1>
          <label htmlFor="email-login"></label>
          <input
            type="email"
            name="email-login"
            id="email-login"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <div className="email error fail"></div>
          <label htmlFor="password-login"></label>
          <input
            type="password"
            name="password-login"
            id="password-login"
            placeholder="Mot de passe"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <div className="password error fail"></div>
          <button type="submit" className="nav-active">
            SE CONNECTER
          </button>
        </form>
        <p>OU</p>
        <ul className="sign-google-fb-apple">
          <li>
            <button type="button" className="blue">
              <i
                className="fa-brands fa-facebook"
                style={{ color: "white" }}
              ></i>
              <p>Connexion avec Facebook</p>
            </button>
          </li>
          <li>
            <button type="button" className="blueclear">
              <i className="fa-brands fa-google" style={{ color: "white" }}></i>
              <p>Connexion avec Google</p>
            </button>
          </li>
          <li>
            <button type="button" className="black">
              <i className="fa-brands fa-apple" style={{ color: "white" }}></i>
              <p>Connexion avec Apple</p>
            </button>
          </li>
        </ul>
        <div className="mdp-oublie">
          <a href="/">Mot de passe oublié ?</a>
        </div>
      </div>
    </>
  );
};

export default SignIn;
