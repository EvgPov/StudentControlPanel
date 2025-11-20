import { studentStore } from '../data/store.js'; // класс для управление массивом данных

import { initDB } from './init/initDatabase.js'; // заполнение базы данных и массива

import { renderTable } from './dom/elements/table.js'; //отрисовка таблицы
import { refresh } from './dom/elements/table.js'; // обновление таблицы

import { createSelect } from './dom/elements/createSelects.js'; //заполнение списка факультетов
import {  minMaxDateBirthdat } from './dom/elements/minMaxDateBirthday.js' // определяем границы ввода дня рождения студента
import { toggleButtonsState, updateSubmitButton } from './dom/elements/addStudent.js' // переключение кнопки добавление студента

import { handleSubmit } from './dom/elements/addStudent.js'; // добавление студента
import { deleteSudent } from './dom/elements/deleteStudent.js' // удаление студента

import { sortTable } from './dom/elements/table.js';

document.addEventListener('DOMContentLoaded', async () => {
  await initDB(); // инициализируем БД
  renderTable(studentStore.students); // рисуем таблицу со студентами

  // динамическое заполнение выпадающих списков факультетов и лет начала обучения
  document.querySelectorAll('[data-style="style"]').forEach(select => {
    select.addEventListener('change', function() { // при выборе элемента списка
      this.classList.toggle('filled', this.value !== ''); // закрашиваем черным все элементы списка, кроме placeholder
    })
    // закрашиваем черным все элементы списка, кроме placeholder
    select.classList.toggle('filled', select.value !== '');
  });
  createSelect('[data-component="select-faculty"]'); //заполняем список факультетов
  createSelect('[data-component="select-studyStart"]'); //заполняем перечен лет начала обучения

   // определяем минимальную и максимальную дату для ввода дня рождения
   minMaxDateBirthdat();

  // добавление студента
  const form = document.querySelector('.main__add-form'); // форма добавления студента
  const buttonAddform = form.querySelector(".main__add-form__submit");

 
  toggleButtonsState(buttonAddform, true) // изначально кнопку отключаем
  updateSubmitButton(form, buttonAddform); // на случай, если в фоорме уже есть значения
// слушаем все изменения
  form.addEventListener('input', () => updateSubmitButton(form, buttonAddform));
  form.addEventListener('change', () => updateSubmitButton(form, buttonAddform))
 // при отправке
  form.addEventListener('submit', (event) => 
    {
      handleSubmit(event); // добавляем в базу данных
      initDB() // получаем данные из базы данных
      .then(data => {
      refresh(studentStore.students); // перерисовываем таблицу
      })
    })    
  // }

  // сортировка таблицы
  // Порядок сортировки: null = нет, 'asc' = по возрастанию, 'desc' = по убыванию
  let sortState = { column: null, direction: null };
  const tableHeaders = document.querySelectorAll('[data-component="students-table"] th[data-sort]');

  tableHeaders.forEach(th => {
    th.addEventListener('click', ()=> {
      const column = th.dataset.sort;
      if (sortState.column === column) {
        sortState.direction = sortState.direction === 'asc' ? 'desc' : 'asc';
      } else {
        sortState.column = column;
        sortState.direction = 'asc';
      }
      refresh(sortTable(sortState)); // сортируем и перерисовываем таблицу
    })
  })

// удаление записи из таблицы

  const tableBody = document.querySelector('[data-role="table-body"]');
  tableBody.addEventListener('click', async(event) => {
    const row = event.target.closest('tr'); // ищем строку на которой произошел клик

    if(!row.dataset.id) return;

    const studentId = row.dataset.id; // получаем id студента
    const studentName = row.querySelector('[data-field="name"]');
    
    deleteSudent(studentId, studentName.textContent)
      .then (data => {
        initDB() // получаем данные из базы данных
        .then(data => {
          refresh(studentStore.students); // перерисовываем таблицу
        })
      })
  })

})
