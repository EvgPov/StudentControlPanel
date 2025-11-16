import { studentStore } from "../../../data/store.js";

export function renderTable (students) {
  const tableBody = document.querySelector('[data-role="table-body"]')
  tableBody.innerHTML = students.map((student, index) =>
    `<tr data-student-id="student-row-${index+1}">
      <td data-field="id">${index+1}</td>
      <td data-field="name">${student.name}</td>
      <td data-field="surname">${student.surname}</td>
      <td data-field="lastname">${student.lastname}</td>
      <td data-field="birthday">${student.birthday}</td>
      <td data-field="studyStart">${student.studyStart}</td>
      <td data-field="faculty">${student.faculty}</td>
      <td data-field="delete"> 🗑️ </td>
     </tr>`
  ).join('');
}

export function refresh() {
  renderTable(studentStore.students)
}