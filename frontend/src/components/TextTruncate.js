import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const TextTruncate = ( text, isCompare ) => {
  const location = useLocation();
  const compareState = useSelector(state => state.userReducer.isCompare);
  const isUserCollectionCardPage = location.pathname.startsWith(`/user/`);

  if (!isCompare && !isUserCollectionCardPage) {
    if (text.length > 20) {
      const truncatedText = text.substring(0, 20) + "...";
      return <span>{truncatedText}</span>;
    } else {
      return <span>{text}</span>;
    }
  } else if ((compareState && compareState) && isUserCollectionCardPage) {
    if (text.length > 14) {
      const truncatedText = text.substring(0,12) + "...";
      return <span>{truncatedText}</span>;
    } else {
      return <span>{text}</span>
    } 
  } else {
    if (text.length > 20) {
      const truncatedText = text.substring(0,20) + "...";
      return <span>{truncatedText}</span>
    } else {
      return <span>{text}</span>
    }
  }
};

export default TextTruncate;
