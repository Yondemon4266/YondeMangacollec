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