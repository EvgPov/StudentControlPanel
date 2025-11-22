import { Student } from '../models/Student.js';
import { faculties } from '../models/constants.js';
import { studyYears } from '../models/constants.js';

export async function fetchDataFromAPI(url) {
  // получаем данные с API
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error (`HTTP error (fetchDataFromAPI): ${response.status}`)
    };
    const rawData = await response.json();
  // форматируем: { name, fathername, lastname, birthday, faculty }    
    const formattedData = rawData.map((element, index) => {
      const student = new Student (
            index,
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
    console.error("Error when receiving data from api", error.message)
  }
}