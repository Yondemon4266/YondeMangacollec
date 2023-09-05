import React from 'react';
import { useParams } from 'react-router-dom';
import { Rating } from "react-simple-star-rating";
const CustomPopularityFriend = ({manga}) => {
  let { user } = useParams();
    return (
        <>
    <h4 id="scoretitle">Score de {user.split('user:')[1]}</h4>
      <Rating
        initialValue={manga.popularityValue ? manga.popularityValue : "0"}
        showTooltip
        allowFraction
        readonly
        tooltipDefaultText="0"
        tooltipClassName="custom-tooltip"
      />
      </>
    );
};

export default CustomPopularityFriend;