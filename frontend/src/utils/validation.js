import { parseBirthday } from '../utils/parseBirthday.js'

export function isNameValid(name) { 
  return name && name.trim().length >= 2 &&  /^[a-zA-Zа-яА-ЯЁё\s-]+$/.test(name)
};
export function isDateValid(date) {
  const parseDate = parseBirthday(date);
  const date10YearsAgo = new Date();
  date10YearsAgo.setFullYear(date10YearsAgo.getFullYear() - 10);

  const date100YearsAgo = new Date();
  date100YearsAgo.setFullYear(date100YearsAgo.getFullYear() - 100);

  return  parseDate && parseDate < date10YearsAgo && parseDate > date100YearsAgo;
};
