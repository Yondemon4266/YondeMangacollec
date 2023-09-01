import React from "react";
import { NavLink } from "react-router-dom";

const SignInSignUp = () => {
  return (
    <div className="signin-signup">
      <ul>
        <NavLink
          to="/users/sign_in"
          className={(nav) => (nav.isActive ? "nav-active hover" : "hover not-activeBtn")}
        >
          <li>CONNEXION</li>
        </NavLink>
        <NavLink
          to="/users/sign_up"
          className={(nav) => (nav.isActive ? "nav-active hover" : "hover not-activeBtn")}
        >
          <li>INSCRIPTION</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default SignInSignUp;
