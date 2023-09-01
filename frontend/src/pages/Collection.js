import React from "react";
import Navigation from "../components/Navigation";
import ChooseToSign from "../components/ChooseToSign";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Collection = () => {
//   const uid = useSelector((state) => state.userReducer.userUid);
//   const userInfo = useSelector((state) => state.userReducer.userInfo);
//   const navigate = useNavigate();
  return (
    <div>
      <Navigation />
      <div className="container">
        <ChooseToSign />
      </div>
    </div>
  );
};

export default Collection;
