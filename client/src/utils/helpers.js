//Ratings converter
export const ratingConverter = (rating) => {
    switch (rating) {
        case 1: 
            return "⭐️";
        case 2: 
            return "⭐️⭐️";
        case 3: 
            return "⭐️⭐️⭐️";
        case 4:
            return "⭐️⭐️⭐️⭐️";
        case 5: 
            return "⭐️⭐️⭐️⭐️⭐️";
        default:
            return "none";
    }
};

export const priceFormatter = (number) => {

  let string = String(number);
  if (string.length === 7) {
    let end = string.slice(1);
    let start = string.slice(0, 1);

  return (`${start},${end}`)
  }
  
  return string;
      
}