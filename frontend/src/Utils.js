export const dateFormater = (date) => {
  let dateSplit = date.split("T")[0].split("-");
  [dateSplit[2], dateSplit[1], dateSplit[0]] = [
    dateSplit[0],
    dateSplit[1],
    dateSplit[2],
  ];
  const dateJoined = dateSplit.join("/");
  return dateJoined;
};

export const determineGrade = (level) => {
  if (level > 0 && level < 5) {
    return "Genin";
  } else if (level >= 5 && level < 10) {
    return "Chûnin";
  } else if (level >= 10 && level < 30) {
    return "Jônin";
  } else if(level >= 30 && level < 40) {
    return "Sennin";
  } else if (level >= 40) {
    return "Kage";
  }
}

export const phraseVillage = (village) => {
  if (village == "Son" || village == "Sable") {
    return "du village caché du";
  } else {
    return "du village caché de la";
  }
}
