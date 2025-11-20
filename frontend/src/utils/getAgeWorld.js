export function getAgeWorld(years) {
  const n = Math.abs(years) % 100; // для чисел больше 100 последние две цифры числа
  const n1 = n % 10 // последняя цифра числа

  if (n > 10 && n < 20) return 'лет' // 11-19 лет
  if (n1 > 1 && n1 < 5) return 'года' // 2, 3, 4 года
  if (n1 === 1) return 'год' // 1, 21, 31, ...
  return 'лет' // все остальное
}