import { faculties, studyYears, endYears } from '../../../../backend/models/constants.js'

export function createSelect(element) {
  let array = [];
  let placeholder = '';
  const select = document.querySelector(element);

  if (!select) return;

  const component = element.match(/select-([^"\]]+)/);
 
  if (component[1] === 'faculty')  {
    placeholder = 'выберите факультет';
    array = [... faculties];
  } 
  if (component[1] === 'studyStart') {
    placeholder = 'выберите год начала обучения';
    array = [... studyYears];
  }  
  if (component[1] === 'studyEnd') {
      placeholder = 'выберите год окончания обучения';
      array = [... endYears];
    }  
  select.innerHTML = `<option value="" disabled selected hidden>${placeholder}</option>`;
  // заполняем
  array.forEach(item => {
    const option = document.createElement('option');
    option.classList.add('option');
    option.value = item.value;
    option.textContent = item.label;
    select.appendChild(option);
  });
};