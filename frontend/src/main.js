import { studentStore } from '../data/store.js'; // класс для управление массивом данных
import { initDB } from './init/initDatabase.js' // заполнение базы данных и массива
import { renderTable } from './dom/elements/table.js' // отрисовка таблицы
import { refresh } from './dom/elements/table.js' // обновление таблицы
import { createFacultySelect } from './dom/elements/facultySelect.js' //заполение списка факультетов

const form = document.querySelector('.main__add-form'); // фома добавления студента

document.addEventListener('DOMContentLoaded', async () => {
  await initDB(); // инициализируем БД
  renderTable(studentStore.students); // рисуем таблицу со студентами
  createFacultySelect(); //заполняем список факультетов
})

form.addEventListener('submit', (event) => {
  
})