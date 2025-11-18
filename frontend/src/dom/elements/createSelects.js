import { faculties, studyYears } from '../../../../backend/models/constants.js'

export function createSelect(element) {
  let array = [];
  let placeholder = '';
  const select = document.querySelector(element);

  if (!select) return;

  const component = element.match(/select-([^"\]]+)/);
 
  if (component[1] === 'faculty')  {
    placeholder = 'select a faculty';
    array = [... faculties];
  } 
  if (component[1] === 'studyStart') {
    placeholder = 'select the starting year of study';
    array = [... studyYears];
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