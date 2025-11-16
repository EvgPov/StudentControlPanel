// const URL_ApiData = 'https://api.randomdatatools.ru//?count=50';
// const URL_Selver = 'http://localhost:3000'

// const faculties = [
//   'Информационные системы и программирование',
//   'Сетевое и системное администрирование',
//   'Дизайн',
//   'Реклама',
//   'Киберспорт',
//   'Разработка компьютерных игр, дополненной и виртуальной реальности',
//   'Интеграция решений с применением технологий искусственного интеллекта',
//   'Техническая эксплуатация и обслуживание роботизированного производства (по отраслям)',
//   'Обеспечение информационной безопасности автоматизированных систем']

// let students = [];

// class Student {
//   constructor(name, surname, lastName,birthday, faculty) {
//     this.name = name.toString();
//     this.surname = surname.toString();
//     this.lastname = lastName.toString();
//     this.birthday = birthday.toString();
//     this.studyStart = new Date().getFullYear().toString();
//     this.faculty = faculty.toString();
//   }
// }



// async function importExternalData(data) {
//   try {
//     const response = await fetch('http://localhost:3000/api/students', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data)
//     });

//     let responseBody = response.clone();

//     if (!response.ok) {
//       const errorBody = await responseBody.json();
//       throw new Error (
//         `HTTP error ${response.status}: ${response.statusText}\nResponse body: ${JSON.stringify(errorBody, null, 2)}`
//       );
//     };
//     const postData = await response.json();
//     return postData
//   } catch (error) {
//      console.error("Error in importExternalData", error)
//   }
// }

// fetchDataFromAPI(URL_ApiData)
//   .then(data => {
//     const mapedData = mapToServerFormat(data);
//     mapedData.forEach(externalStudent => {
//       importExternalData(externalStudent)
//       .then(data => {
//         console.log('data import', data)
//       })
//     })  
//       .catch (error => console.log('error import ', error))
//   })
//   .catch(error => console.log('error fetchDataFromAPI', error))

import apiClient  from './apiClient.js';

export async function get(url, options) {
  return await apiClient(url, { method: 'GET', ...options });
}
export async function post(url, body, options) {
  return await apiClient(url, { method: 'POST', body, ...options });
}
export async function put(url, body, options) {
  return await apiClient(url, { method: 'PUT', body, ...options });
}
export async function patch(url, body, options) {
  return await apiClient(url, { method: 'PATCH', body, ...options });
}
export async function del(url, options) {
  return await apiClient(url, { method: 'DELETE', ...options });
}