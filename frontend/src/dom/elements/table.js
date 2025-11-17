import { studentStore } from "../../../data/store.js";
import {  getAge } from "../../utils/ageCalculation.js"
import { getStudyEnd } from '../../utils/studyEnd.js'
import { courseDetermine } from '../../utils/courseDetermine.js'

// <th data-field="id">№</th>
//             <th data-field="name">ФИО</th>
//             <th data-field="faculty">ФАКУЛЬТЕТ</th>
//             <th data-field="birthday_age">ДАТА РОЖДЕНИЯ (ВОЗРАСТ)</th>
//             <th data-field="studyYears_courseNumber">ГОДЫ ОБУЧЕНИЯ (НОМЕР КУРСА)</th>

// export function renderTable (students) {
//   const tableBody = document.querySelector('[data-role="table-body"]')
//   tableBody.innerHTML = students.map((student, index) =>
//     `<tr data-student-id="student-row-${index+1}">
//       <td data-field="id">${index+1}</td>
//       <td data-field="name">${student.name} ${student.surname} ${student.lastname}</td>
//       <td data-field="surname">${student.surname}</td>
//       <td data-field="lastname">${student.lastname}</td>
//       <td data-field="birthday">${student.birthday}</td>
//       <td data-field="studyStart">${student.studyStart}</td>
//       <td data-field="faculty">${student.faculty}</td>
//       <td data-field="delete"> 🗑️ </td>
//      </tr>`
//   ).join('');
// }

export function renderTable (students) {
  const tableBody = document.querySelector('[data-role="table-body"]')
  tableBody.innerHTML = students.map((student, index) =>
    `<tr data-student-id="student-row-${index+1}">
      <td data-field="id">${index+1}</td>
      <td data-field="name">${student.name} ${student.surname} ${student.lastname}</td>
      <td data-field="faculty">${student.faculty}</td>
      <td data-field="birthday_age">${student.birthday} (${getAge(student.birthday)} лет)</td>
      <td data-field="studyYears_courseNumber">${student.studyStart}-${getStudyEnd(student.studyStart) === 'закончил' ? getStudyEnd(student.studyStart) : getStudyEnd(student.studyStart) + '<br>' +'(' + courseDetermine(student.studyStart) + ' курс)'}</td>
     
      <td data-field="delete"> 🗑️ </td>
     </tr>`
  ).join('');
}

export function refresh() {
  renderTable(studentStore.students)
}