import { studentStore } from "../../../data/store.js";
import { getAge } from "../../utils/ageCalculation.js"
import { getStudyEnd } from '../../utils/studyEnd.js'
import { courseDetermine } from '../../utils/courseDetermine.js'
import { parseBirthday } from '../../utils/parseBirthday.js'
import { getAgeWorld } from '../../utils/getAgeWorld.js'

export function renderTable (students) {
  const tableBody = document.querySelector('[data-role="table-body"]')
  tableBody.innerHTML = students.map((student, index) =>
    `<tr data-id="${student.id}">
      <td data-field="id">${index+1}</td>
      <td data-field="name">${student.name} ${student.surname} ${student.lastname}</td>
      <td data-field="faculty">${student.faculty}</td>
      <td data-field="birthday_age">${student.birthday} (${getAge(student.birthday)} ${getAgeWorld(getAge(student.birthday))})</td>
      <td data-field="studyYears_courseNumber">${student.studyStart}-${getStudyEnd(student.studyStart) === 'закончил' ? getStudyEnd(student.studyStart) : getStudyEnd(student.studyStart) + '<br>' +'(' + courseDetermine(student.studyStart) + ' курс)'}</td>
     
      <td data-field="delete">
        <img 
            src="../frontend/style/image/trash-bin-trash-svgrepo-com.svg" 
            alt="Удалить" 
            class="delete-icon" 
            style="width:20px; cursor:pointer;"
          >
      </td>
     </tr>`
  ).join('');
}

export function refresh(students) {
  renderTable(students)
}

export function sortTable(sortState) {
  if (sortState.column) {
    const copyStudentStore = studentStore.students.map((item, index) => ({ item, index }));
      copyStudentStore.sort((a, b) => {
        let itemA = a.item[sortState.column];
        let itemB = b.item[sortState.column];
        // дата
        if (sortState.column === 'birthday_age') {
          itemA = parseBirthday(a.item.birthday);
          itemB = parseBirthday(b.item.birthday);
        
          return sortState.direction === 'asc'
            ? new Date(itemA) - new Date(itemB)
            : new Date(itemB) - new Date(itemA);
        }
        // studyYears_courseNumber
        if (sortState.column === 'studyYears_courseNumber') {
        itemA = parseInt(a.item.studyStart);
        itemB = parseInt(b.item.studyStart);
        }
        // id
        if (sortState.column === 'id') {
          itemA = a.index;
          itemB = b.index;
        };
        if (!isNaN(itemA) && !isNaN(itemB)) {
          itemA = Number(itemA);
          itemB = Number(itemB);
        }

        if (itemA < itemB) return sortState.direction === 'asc' ? -1 : 1;
        if (itemA > itemB) return sortState.direction === 'asc' ? 1 : -1;
        return 0;
    })
    const sortStudentStore = copyStudentStore.map(item => item.item);
    return sortStudentStore;
  }
}