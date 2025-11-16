import { PUBLIC_API_URL } from '../../backend/config/apiConfig.js';
import { URL_SERVER } from '../../backend/config/apiConfig.js';
import { fetchDataFromAPI } from '../../backend/services/dataSeeder.js';
import { post, get } from '../src/api/script.js';

async function initDB() {
   try {
    // Проверяем, есть ли данные на сервере
    const existing = await get(URL_SERVER);
    // если база пуста — импортируем
    if (existing.length === 0) {
      console.log('База пуста. Запускаем импорт...');
      const data = await fetchDataFromAPI(PUBLIC_API_URL);
      for (const student of data) {
        await post(URL_SERVER, student);
      }
      console.log('Импорт завершён');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
 
})