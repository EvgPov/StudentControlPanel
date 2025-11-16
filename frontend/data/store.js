import { Student } from '../../backend/models/Student.js'

class StudenStore {
  constructor() {
    if (StudenStore.instance) {
      return StudenStore.instance;
    }
    this._students = [];
    StudenStore.instance = this;
  }

  get students() {
    return [... this._students];
  }

  setStudents(rawData) {
    // this._students = rawData.map(data => new Student(data));
    this._students = rawData.map(data => ({ ...data }));
  }

  addStudent(student) {
    this._students.push(new Student(student))
  }

  clear() {
    this._students = [];
  }

  findById(id) {
    return this._students.find(student => student.id === id)
  }
}

export const studentStore = new StudenStore ;