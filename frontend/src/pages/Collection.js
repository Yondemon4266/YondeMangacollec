import React from "react";
import Navigation from "../components/Navigation";
import ChooseToSign from "../components/ChooseToSign";

const Collection = () => {
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
