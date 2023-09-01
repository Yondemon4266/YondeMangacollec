import React from "react";

const TextTruncate = ( text ) => {
  if (text.length > 20) {
    const truncatedText = text.substring(0, 22) + "...";
    return <span>{truncatedText}</span>;
  } else {
    return <span>{text}</span>;
  }
};

export default TextTruncate;
