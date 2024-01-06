import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import SignInSignUp from "../components/SignInSignUp";
import SignIn from "../Log/SignIn";
import axios from "axios";
import { Navigate } from "react-router-dom";

const SignUp = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const submitError = document.querySelector(".submit-error");
    passwordConfirmError.innerHTML = "";
    emailError.innerHTML = "";
    pseudoError.innerHTML = "";
    passwordConfirmError.innerHTML = "";
    submitError.innerHTML = "";

    if (password === "" || email === "" || pseudo === "") {
      submitError.innerHTML = "Un ou des champs requis n'ont pas été remplis";
    }
    if (password !== controlPassword) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          setFormSubmit(true);
        })
        .catch((err) => {
          console.log(err);
          pseudoError.innerHTML = err.response.data.errors.pseudo;
          emailError.innerHTML = err.response.data.errors.email;
          passwordError.innerHTML = err.response.data.errors.password;
        });
    }
  };

  useEffect(() => {
    const success = document.querySelector(".success");
    if (formSubmit) {
      setTimeout(() => {
        success.style.display = "none";
      }, 5000);
    }
  }, [formSubmit]);

  return (
    <>
      <Navigation />
      {formSubmit ? (
        <>
          (<SignIn />
          <h4 className="success">
            Enregistrement réussi, veuillez vous connecter
          </h4>
          )
        </>
      ) : (
        <div className="sign container">
          <SignInSignUp />
          <form action="" onSubmit={(e) => handleRegister(e)}>
            <h1>INSCRIPTION</h1>
            <label htmlFor="pseudo-signup"></label>

            <input
              type="text"
              name="pseudo-signup"
              id="pseudo-signup"
              placeholder="Pseudo"
              onChange={(e) => setPseudo(e.target.value)}
              value={pseudo}
              required
              autoComplete="off"
            />

            <div className="pseudo error fail"></div>
            <label htmlFor="email-signup"></label>

            <input
              type="email"
              name="email-signup"
              id="email-signup"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              autoComplete="off"
            />
            <div className="email error fail"></div>
            <label htmlFor="password-signup"></label>
            <input
              type="password"
              name="password-signup"
              id="password-signup"
              placeholder="Mot de passe"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <div className="password error fail"></div>
            <label htmlFor="password-signup-conf"></label>
            <input
              type="password"
              name="password-signup-conf"
              id="password-signup-conf"
              placeholder="Confirmer le mot de passe"
              onChange={(e) => setControlPassword(e.target.value)}
              value={controlPassword}
              required
            />
            <div className="password-confirm error fail"></div>
            <button type="submit" className="nav-active">
              S'INSCRIRE
            </button>
            <div className="submit-error"></div>
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
                <i
                  className="fa-brands fa-google"
                  style={{ color: "white" }}
                ></i>
                <p>Connexion avec Google</p>
              </button>
            </li>
            <li>
              <button type="button" className="black">
                <i
                  className="fa-brands fa-apple"
                  style={{ color: "white" }}
                ></i>
                <p>Connexion avec Apple</p>
              </button>
            </li>
          </ul>
          <div className="mdp-oublie">
            <a href="/">Mot de passe oublié ?</a>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
