const color = require('bash-color')

function Month(no) {
  const months = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.',
  ]

  return months[no]
}

const date = new Date()
const DateLine = `${color.yellow(
  `${Month(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`
)} | ${
  (date.getHours() % 12).toString().length < 2
    ? `0${date.getHours() % 12}`
    : date.getHours() % 12
}:${
  date.getMinutes().toString().length < 2
    ? `0${date.getMinutes()}`
    : date.getMinutes()
} ${date.getHours() >= 12 ? 'PM' : 'AM'}`

module.exports = DateLine
