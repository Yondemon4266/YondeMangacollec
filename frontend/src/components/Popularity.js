import React from "react";
import { Rating } from "react-simple-star-rating";

const Popularity = ({ manga }) => {
  const maxValue = manga.airing ? 23986 : 53117;
  const currentValue = manga.rank ? manga.rank : manga.popularity;
  const fillPercentage = 5 - (currentValue * 5) / maxValue;
  return (
    <Rating
      initialValue={fillPercentage.toFixed(1)}
      disableFillHover
      allowHover="false"
      readonly
      allowFraction
      fillColor="#2F52A2"
      showTooltip
    />
  );
};

export default Popularity;
