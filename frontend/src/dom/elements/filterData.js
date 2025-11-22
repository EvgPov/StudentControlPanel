import { URL_SERVER } from '../../../../backend/config/apiConfig.js';
import { get } from '../../api/script.js';
import { studentStore  } from '../../../data/store.js'
import { faculties } from '../../../../backend/models/constants.js';
import { studyYears } from '../../../../backend/models/constants.js';

export async function filterData(event) {
  event.preventDefault();
  const form = event.target;
  try {
      const formData = new FormData(form);

      const cleanDataForFilter = Object.fromEntries( // убираем пустые поля из formData
        Array.from(formData.entries())
          .filter(([_, value]) => value !== '' && value != null)
          .map(([key, value]) => [key, value])
      );
      let searchString = '';
      if (Object.keys(cleanDataForFilter).length === 1) { // если заполнено одно поле, то делаем запрос на сервер
        const key = Object.keys(cleanDataForFilter)[0];
          key === 'studyEndFilter'
          ? searchString = `${parseInt(cleanDataForFilter[key]) - 4}`
          : searchString = `${cleanDataForFilter[key]}`;

      const response = await get(`${URL_SERVER}/?search=${searchString}`);
      form.reset() // очищаем форму
      return response;
      } else { // если выбраны два и более поля для фильтрации, то фильтруем внутренний масив
        const name = cleanDataForFilter.nameFilter;
        const faculty = cleanDataForFilter.facultyFilter;
        const studyStart = cleanDataForFilter.studyStartFilter;
        const studyEnd = cleanDataForFilter.studyEndFilter;

        const filterStudents = studentStore.students.filter(student => {
          const nameMatch = !name || name.trim() === "" ||
                [student.name, student.surname, student.lastname].some(field => 
                  field?.toLowerCase().includes(name.toLowerCase())
                );          

          const facultyMatch = faculty
                ? student.faculty === faculty
                : faculties.some(f => f.label === student.faculty);

          const studyStartyMatch = studyStart
                ? student.studyStart === studyStart
                : studyYears.some(y => y.label === student.studyStart);

           const studyEndMatch = studyEnd
                ? student.studyStart === String(parseInt(studyEnd) - 4)
                : studyYears.some(y => y.label === String(parseInt(student.studyStart) + 4));
          return nameMatch && facultyMatch && studyStartyMatch && studyEndMatch;    
        })
        form.reset() // очищаем форму
        return filterStudents;
      }
  } catch(error){
      console.error('Error (filter data):', error);
  }    
 }