const evaluateRating = (joke, currentUserRatings, selectedValue, ratingRecordExists, ratedRecently) => {

  let sum = 0

  joke.ratings.forEach((rating) => {
    sum += rating.value
  })

  if (!ratingRecordExists && selectedValue !==0) {    // the user is submitting their first rating
    sum += selectedValue*2
    var average = sum/(joke.ratings.length + 1)
  } else if (ratingRecordExists && ratedRecently) {   // the user is assigning a new rating
    const userRating = currentUserRatings.find(rating => rating.joke.id === joke.id)
    sum -= userRating.value
    sum += selectedValue*2
    var average = sum/joke.ratings.length
  } else {                                            // initial page load
    var average = sum/joke.ratings.length
  }

  return Math.round(average)/2
}

export default evaluateRating