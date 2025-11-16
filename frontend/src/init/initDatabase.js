import { PUBLIC_API_URL } from '../../../backend/config/apiConfig.js';
import { URL_SERVER } from '../../../backend/config/apiConfig.js';
import { fetchDataFromAPI } from '../../../backend/services/dataSeeder.js';
import { Student } from '../../../backend/models/Student.js'
import { studentStore } from '../../data/store.js';
import { post, get } from '../../src/api/script.js';

export async function initDB() {
   try {
    // Проверяем, есть ли данные на сервере
    const existing = await get(URL_SERVER);
    // если база пуста — импортируем
    if (existing.length === 0) {
      console.log('База пуста. Запускаем импорт...');
      const data = await fetchDataFromAPI(PUBLIC_API_URL); // берем данные из публичного API
      for (const student of data) { 
        await post(URL_SERVER, student); // заполняем БД
      }
      console.log('Импорт завершён');
    }
    const freshData = await get(URL_SERVER);
    // форматируем: { name, fathername, lastname, birthday, faculty }    
    const formattedData = freshData.map(element => {
      const student = new Student (
            element.name,
            element.surname,
            element.lastname,
            element.birthday,
            element.studyStart,
            element.faculty
      );
      console.log('student ', student);
      return student
    })
    console.log('freshData ', freshData);
    console.log('formattedData ', formattedData);
    studentStore.setStudents(formattedData)
  } catch (error) {
    console.error('Error:', error);
  }
}