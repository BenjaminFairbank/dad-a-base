const timestampConverter = (timestamp) => {

  const time = new Date(timestamp)
  let hour = time.getHours()
  let timeOfDay = 'AM'
  let min = time.getMinutes() < 10 ? min = '0' + time.getMinutes() : time.getMinutes()

  if (time.getHours() > 12) {
    hour = time.getHours() - 12
    timeOfDay = 'PM'
  } else if (time.getHours() === 0 ) {
    hour = 12
  }

  return time.toDateString() + ' ' + hour + ':' + min + ' ' + timeOfDay
}

export default timestampConverter