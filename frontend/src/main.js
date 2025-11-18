import { studentStore } from '../data/store.js'; // класс для управление массивом данных
import { initDB } from './init/initDatabase.js' // заполнение базы данных и массива
import { renderTable } from './dom/elements/table.js' // отрисовка таблицы
import { refresh } from './dom/elements/table.js' // обновление таблицы
import { createSelect } from './dom/elements/createSelects.js' //заполение списка факультетов

const form = document.querySelector('.main__add-form'); // фома добавления студента

document.addEventListener('DOMContentLoaded', async () => {
  await initDB(); // инициализируем БД
  renderTable(studentStore.students); // рисуем таблицу со студентами

  document.querySelectorAll('[data-style="style"]').forEach(select => {
    select.addEventListener('change', function() {
      this.classList.toggle('filled', this.value !== '');
    })
    select.classList.toggle('filled', select.value !== '');
  });
  createSelect('[data-component="select-faculty"]'); //заполняем список факультетов
  createSelect('[data-component="select-studyStart"]'); //заполняем перечен лет начала обучения
})


form.addEventListener('submit', (event) => {

})