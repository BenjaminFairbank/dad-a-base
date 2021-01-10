const RatingEvaluator = (ratings) => {

  let sum = 0

  ratings.forEach((rating) => {
    sum += rating.value
  })

  let average = sum/ratings.length
  
  return Math.round(average)/2
}

export default RatingEvaluator