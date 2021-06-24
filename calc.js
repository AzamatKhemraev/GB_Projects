/**/
let calcArr = document.querySelectorAll('button')
let operandA = document.querySelector('#operandA')
let operandB = document.querySelector('#operandB')
let result = document.querySelector('.result')

result.innerHTML = 0

const sum = (a, b) => {
  return a + b
}

function difference(a, b) {
  return a - b
}

function divide(a, b) {
  return a / b
}

function multiplication(a, b) {
  return a * b
}

calcArr.forEach((elem) => {
  elem.addEventListener('click', (e) => {
    let total = 0
    if (e.target.parentNode.id === 'sum') {
      total = sum(+operandA.value, +operandB.value)
    }

    if (e.target.parentNode.id === 'difference') {
      total = difference(+operandA.value, +operandB.value)
    }

    if (e.target.parentNode.id === 'divide') {
      total = divide(+operandA.value, +operandB.value)
    }

    if (e.target.parentNode.id === 'multiplication') {
      total = multiplication(+operandA.value, +operandB.value)
    }

    result.innerHTML = total
  })
})
