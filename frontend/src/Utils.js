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

export const determineGrade = (
  level,
  universe,
  marineorpirate,
  island,
  village
) => {
  if (universe === "naruto") {
    if (level > 0 && level < 5) {
      return `Genin ${phraseVillage(village)}`;
    } else if (level >= 5 && level < 10) {
      return `Chûnin ${phraseVillage(village)}`;
    } else if (level >= 10 && level < 30) {
      return `Jônin ${phraseVillage(village)}`;
    } else if (level >= 30 && level < 40) {
      return `Sennin ${phraseVillage(village)}`;
    } else if (level >= 40) {
      return `Kage ${phraseVillage(village)}`;
    }
  } else if (universe === "onepiece") {
    if (level > 0 && level < 5) {
      return marineorpirate === "marine"
        ? `Matelot de ${island} `
        : `Pirate de ${island}`;
    } else if (level >= 5 && level < 10) {
      return marineorpirate === "marine"
        ? `Soldat de ${island}`
        : `Cannonier de ${island}`;
    } else if (level >= 10 && level < 30) {
      return marineorpirate === "marine"
        ? `Colonel de ${island}`
        : `Tireur d'élite de ${island}`;
    } else if (level >= 30 && level < 40) {
      return marineorpirate === "marine"
        ? `Vice-amiral de ${island}`
        : `Bras droit de ${island}`;
    } else if (level >= 40) {
      return marineorpirate === "marine"
        ? `Amiral de ${island}`
        : `Capitaine de ${island}`;
    }
  }
  return "";
};

export const phraseVillage = (village) => {
  if (village == "Son" || village == "Sable") {
    return "du village caché du";
  } else {
    return "du village caché de la";
  }
}
