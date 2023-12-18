export const determineGrade = (level, universe, marineorpirate) => {
  if (universe === "naruto") {
    if (level > 0 && level < 5) {
      return "Genin";
    } else if (level >= 5 && level < 10) {
      return "Chûnin";
    } else if (level >= 10 && level < 30) {
      return "Jônin";
    } else if (level >= 30 && level < 40) {
      return "Sennin";
    } else if (level >= 40) {
      return "Kage";
    }
  } else if (universe === "onepiece") {
    if (level > 0 && level < 5) {
      return marineorpirate === "marine" ? "Matelot" : "Pirate";
    } else if (level >= 5 && level < 10) {
      return marineorpirate === "marine" ? "Soldat" : "Cannonier";
    } else if (level >= 10 && level < 30) {
      return marineorpirate === "marine" ? "Colonel" : "Tireur d'élite";
    } else if (level >= 30 && level < 40) {
      return marineorpirate === "marine" ? "Vice-amiral" : "Bras droit";
    } else if (level >= 40) {
      return marineorpirate === "marine" ? "Amiral" : "Capitaine";
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
};

export const villages = ["Feuille", "Sable", "Roche", "Brume", "Pluie", "Son"];
export const islands = [
  "Wa no Kuni",
  "Wholecake Island",
  "Log Town",
  "Dressrosa",
  "Sabaody",
  "Alabasta",
  "Skypiea",
  "Marineford",
  "Impel Down",
  "Royaume de Goa",
  "Fuschia",
  "Marineford",
];
