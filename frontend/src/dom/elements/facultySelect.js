import { faculties } from '../../../../backend/models/constants.js'

export function createFacultySelect() {
  const select = document.querySelector('[data-component="select-faculty"]');
  if (!select) return;
  // очищаем
  select.innerHTML = '<option value="">- Выберите факультет -</option>';

  // заполняем
  faculties.forEach(faculty => {
    const option = document.createElement('option');
    option.classList.add('option-faculty');
    option.value = faculty.value;
    option.textContent = faculty.label;
    select.appendChild(option);
  });
};