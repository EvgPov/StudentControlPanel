export function courseDetermine(studyStart) {
  const today = new Date();
    const sept01 = new Date(today.getFullYear(), 8, 1); // делаем 01 сентября года текущего года
  
  if (today > sept01) {
    return today.getFullYear() - studyStart + 1
  } else {
    return today.getFullYear() - studyStart 
  }
}