import { studentStore } from '../data/store.js'; // класс для управление массивом данных

import { initDB } from './init/initDatabase.js'; // заполнение базы данных и массива

import { renderTable } from './dom/elements/table.js'; //отрисовка таблицы
import { refresh } from './dom/elements/table.js'; // обновление таблицы

import { createSelect } from './dom/elements/createSelects.js'; //заполнение списка факультетов
import { minMaxDateBirthdat } from './dom/elements/minMaxDateBirthday.js' // определяем границы ввода дня рождения студента
import { toggleButtonsState, updateSubmitButton } from './dom/elements/addStudent.js' // переключение кнопки добавление студента

import { handleSubmit } from './dom/elements/addStudent.js'; // добавление студента
import { deleteSudent } from './dom/elements/deleteStudent.js' // удаление студента
import { filterData } from './dom/elements/filterData.js'; // фильтрация данных

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
  // selects для фильтров
  createSelect('[data-component="filterselect-faculty"]'); //заполняем список факультетов
  createSelect('[data-component="filterselect-studyStart"]'); //заполняем перечень лет начала обучения
  createSelect('[data-component="filterselect-studyEnd"]'); //заполняем перечень лет окончания обучения
  // selets для добавления
  createSelect('[data-component="select-faculty"]'); //заполняем список факультетов
  createSelect('[data-component="select-studyStart"]'); //заполняем перечень лет начала обучения
  createSelect('[data-component="select-studyEnd"]'); //заполняем перечень лет окончания обучения
   // определяем минимальную и максимальную дату для ввода дня рождения
   minMaxDateBirthdat();

  // добавление студента
  const formAdd = document.querySelector('#add-form'); // форма добавления студента
  const buttonAddform = formAdd.querySelector(".main__add-form__submit");

  toggleButtonsState(buttonAddform, true) // изначально кнопку отключаем
  updateSubmitButton(formAdd, buttonAddform); // на случай, если в фоорме уже есть значения
// слушаем все изменения
  formAdd.addEventListener('input', () => updateSubmitButton(formAdd, buttonAddform));
  formAdd.addEventListener('change', () => updateSubmitButton(formAdd, buttonAddform))
 // при отправке формы добавления стуента
  formAdd.addEventListener('submit', (event) => 
    {
      handleSubmit(event); // добавляем в базу данных
      initDB() // получаем данные из базы данных
      .then(data => {
        refresh(studentStore.students); // перерисовываем таблицу
      })
    })    

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
    // проверяем кликнули ли по иконке удаления
    const deleteIcon = event.target.closest(".delete-icon");
    // const row = event.target.closest('tr'); // ищем строку на которой произошел клик
    // if(!row.dataset.id) return;
    if (!deleteIcon) return;
  // находим строку
    const row = deleteIcon.closest('tr');
    if(!row || !row.dataset.id) return;
    
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
  // фильтрация данных
  // при отправке формы добавления стуента
 const formFilter = document.querySelector('#filter-form'); // форма фильтрации данных
 const resetBtn = formFilter.querySelector('.reset-filters-btn'); // кнопка сброса фильтров
  formFilter.addEventListener('submit', (event) => 
    {
      filterData(event)  // добавляем в базу данных
      .then(data => {
        refresh(data);
      })
    })    
  resetBtn.addEventListener('click', () => {
    initDB() // получаем данные из базы данных
      .then(data => {
        refresh(studentStore.students); // перерисовываем таблицу
      })
  })
})
