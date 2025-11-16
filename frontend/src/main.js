// import { PUBLIC_API_URL } from '../../backend/config/apiConfig.js';
// import { URL_SERVER } from '../../backend/config/apiConfig.js';
// import { fetchDataFromAPI } from '../../backend/services/dataSeeder.js';
// import { post, get } from '../src/api/script.js';

import { studentStore } from '../data/store.js';
import { initDB } from './init/initDatabase.js'
import { renderTable } from './dom/elements/table.js'

document.addEventListener('DOMContentLoaded', async () => {
 await initDB(); // инициализируем БД
 renderTable(studentStore.students); // рисуем таблицу со студентами
})