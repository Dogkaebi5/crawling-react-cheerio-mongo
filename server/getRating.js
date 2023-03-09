const WeekRating = require("./mongodb");

async function getRatings() {
  return await WeekRating.find()
}

export default getRatings;