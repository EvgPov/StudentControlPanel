export class Student {
  constructor(name, fatherName, lastName, birthday, faculty) {
    this.name = name.toString();
    this.surname = fatherName.toString();
    this.lastname = lastName.toString();
    this.birthday = birthday.toString();
    this.studyStart = new Date().getFullYear().toString();
    this.faculty = faculty.toString();
  }
}