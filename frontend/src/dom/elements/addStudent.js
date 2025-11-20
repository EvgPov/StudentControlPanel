import { URL_SERVER } from '../../../../backend/config/apiConfig.js'
import { studyYears } from '../../../../backend/models/constants.js';
import { capitalizeFirst } from '../../utils/capitalizeFirst.js'
import { post } from '../../api/script.js'
import { isDateValid, isNameValid } from '../../utils/validation.js';

// проверка валиднойсти всей формы
function validateForm(form) {
  const formData = new FormData(form);
  const studentData = Object.fromEntries(formData.entries());
  let hasError = false;

  form.querySelectorAll('.error-message').forEach(span => {
    span.textContent = '';
    span.classList.remove('show');
  })
  form.querySelectorAll('.form__item', 'input', 'select').forEach(item => {
    item.classList.remove('invalid');
  });

   // проверка inputs
   // name
if (!isNameValid(studentData.name)) {
    showError(form, 'name', 'Имя должно содержать минимум 2 буквы. Имя может состоять из букв, заков пробела и  дефиса');
    hasError = true;
  } else hideError(form, 'name');
  
  // surname
  if (!isNameValid(studentData.surname)) {
    showError(form,'surname', 'Отчество должно содержать минимум 2 буквы. Отчество может состоять из букв, заков пробела и  дефиса');
    hasError = true;
  } else hideError(form, 'surname');

  // lastname
  if (!isNameValid(studentData.lastname)) {
    showError(form,'lastname', 'Фамилия должна содержать минимум 2 буквы. Фамилия может состоять из букв, заков пробела и  дефиса');
    hasError = true;
  } else hideError(form, 'lastname', );

  //birthday
  if (!isDateValid(studentData.birthday)) {
    showError(form, 'birthday', 'День рождения студента должен быть установлен. Студент не может быть младше 10 лет и старше 100 лет');
    hasError = true;
  } else hideError(form, 'birthday');

// проверяем selects
  //studyStart
  if (!studentData.hasOwnProperty('studyStart') || studentData.studyStart === '') {
    showError(form, 'studyStart', 'Выберите год начала обучения');
    hasError = true;
  } else hideError(form, 'studyStart');
  // faculty
  if (!studentData.hasOwnProperty('faculty') || studentData.faculty === '') {
    showError(form, 'faculty', 'Выберите факультет');
    hasError = true;
  } else hideError(form, 'faculty');

return !hasError; // true - форма валидна
}
// обновление состояния кнопки
export function updateSubmitButton(form, button) {
  const isValid = validateForm(form);
  toggleButtonsState(button, !isValid); // если есть ошибка - выключаем
}

function showError(form, fieldName, message) {
  const element = form.querySelector(`[name="${fieldName}"]`);
  const errorElement = form.querySelector(`.${element.id}-error`);
  errorElement.textContent = message;
  errorElement.classList.add("show");
  element.classList.add("invalid");
}

function hideError(form, fieldName) {
  const element = form.querySelector(`[name="${fieldName}"]`);
  const errorElement = form.querySelector(`.${element.id}-error`)
  errorElement.classList.remove("show");
  element.classList.remove("invalid");
}

export function toggleButtonsState (buttonElement, hasError) {
  if (hasError) {
      buttonElement.disabled = true;
      buttonElement.classList.add("main__add-form__submit_disabled");
  } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove("main__add-form__submit_disabled");
  }
}
export async function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const buttonElement = form.querySelector(".main__add-form__submit");

  toggleButtonsState (buttonElement, true); // блокируем, чтобы не отправить дважды

    try {
      const formData = new FormData(form);
      const studentData = Object.fromEntries(formData.entries());
      
      studentData.name = capitalizeFirst(studentData.name);
      studentData.surname = capitalizeFirst(studentData.surname);
      studentData.lastname = capitalizeFirst(studentData.lastname);

      const newStudent = await post(URL_SERVER, studentData);
      alert(`Студент добавлен! ID: ${newStudent.id}`);

      form.reset() // очищаем форму
      // toggleButtonsState(buttonElement, false); // после сброса — разблокирована
      updateSubmitButton(form, buttonElement);
    } catch (error) {
      console.error('Error (add student):', error);
      alert('Ошибка при добавлении студента');
      toggleButtonsState(buttonElement, false); // разблокируем при ошибке
    }
  // }  
}