const sum = (a, b) => {
  if (isNaN(a) || isNaN(b)) {
    return null
  }
  return a + b
}

const difference = (a, b) => {
  if (isNaN(a) || isNaN(b)) {
    return null
  }
  return a - b
}

const divide = (a, b) => {
  if (isNaN(a) || isNaN(b)) {
    return null
  }
  return a / b
}

const multiplication = (a, b) => {
  if (isNaN(a) || isNaN(b)) {
    return null
  }
  return a * b
}

module.exports = {
  sum: sum,
  difference: difference,
  divide: divide,
  multiplication: multiplication,
}
