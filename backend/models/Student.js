export class Student {
  constructor(id, name, fatherName, lastName, birthday, studyStart, faculty) {
    this.id = id;
    this.name = name.toString();
    this.surname = fatherName.toString();
    this.lastname = lastName.toString();
    this.birthday = birthday.toString();
    this.studyStart = studyStart.toString();
    this.faculty = faculty.toString();
  }
}