import React from "react";

const TextTruncate = ( text, isCompare ) => {
  if (!isCompare) {
    if (text.length > 20) {
      const truncatedText = text.substring(0, 22) + "...";
      return <span>{truncatedText}</span>;
    } else {
      return <span>{text}</span>;
    }
  } else {
    if (text.length > 14) {
      const truncatedText = text.substring(0,15) + "...";
      return <span>{truncatedText}</span>;
    } else {
      return <span>{text}</span>
    }
  }
};

export default TextTruncate;
