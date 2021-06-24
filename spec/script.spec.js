const calc = require('../main')
const sum = calc.sum
describe('Функция sum', () => {
  it('Возвращает 5 при аргументах (2,3)', () => {
    expect(sum(2, 3)).toBe(5)
  })

  it('Возвращает NaN при аргументах (2,"aasd")', () => {
    expect(sum(2, 'aasd')).toBe(null)
  })

  it('Возвращает -1 при аргументах (2,3)', () => {
    expect(calc.difference(2, 3)).toBe(-1)
  })

  it('Возвращает Infinity при аргументах (6,0)', () => {
    expect(calc.divide(6, 0)).toBe(Infinity)
  })

  it('Возвращает 0 при аргументах (0,6)', () => {
    expect(calc.divide(0, 6)).toBe(0)
  })

  it('Возвращает 0 при аргументах (0,6)', () => {
    expect(calc.multiplication(0, 6)).toBe(0)
  })

  it('Возвращает NaN при аргументах (2,"aasd")', () => {
    expect(calc.multiplication(2, 'aasd')).toBe(null)
  })
})
