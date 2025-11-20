
export function minMaxDateBirthdat () {
  const dateInput = document.querySelector('#birthday');
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 100); // 100 лет от текущей даты
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 10); // 10 лет от текущей даты
  dateInput.min = minDate.toISOString().split('T')[0];
  dateInput.max = maxDate.toISOString().split('T')[0];
}