import { Student } from '../models/Student.js'
import { faculties } from '../models/constants.js';
import {  studyYears } from '../models/constants.js'

export async function fetchDataFromAPI(url) {
  // получаем данные с API
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error (`HTTP error (fetchDataFromAPI): ${response.status}`)
    };
    const  rawData = await response.json();
  // форматируем: { name, fathername, lastname, birthday, faculty }    
    const formattedData = rawData.map(element => {
      const student = new Student (
            element.FirstName,
            element.FatherName,
            element.LastName,
            element.DateOfBirth,
            studyYears[Math.floor(Math.random() * studyYears.length)].label,
            faculties[Math.floor(Math.random() * faculties.length)].label
      );
      return student
    })
    return formattedData
  } catch(error) {
    console.error("Error in fetchDataFromAPI", error.message)
  }
}

// export async function importExternalData(data) {
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

// function mapToServerFormat(dataApi) {
  // dataApi.forEach(data => {
  //   const student = new Student(data.FirstName, data.FatherName, data.LastName,
  //                               data.DateOfBirth, faculties[0]);
  //   students.push(student);
  // })

  // Преобразуем: берём только id, name, email
//     const formattedData = {
//       users: data.map(user => ({
//         id: user.id,
//         name: user.name,
//         email: user.email
//         // можно добавить: username: user.username,
//       }))
//     };
//   return students;
// }