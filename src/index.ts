type LecturerType = {
    name: string;
    surname: string;
    position: string;
    company: string;
    experience: number;
    courses: number;
    contacts: {
        email: string;
        phone: number;
    }
}

class School {
    // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

    _areas: Area[] = [];
    _lecturers: LecturerType[] = []; // Name, surname, position, company, experience, courses, contacts

    addArea(area: Area): void{
        this._areas.push(area);
    }

    removeArea(area: Area): Area[]{
        return this._areas.filter((x:Area) => x !== area);
    }

    addLecturer(lecturer: LecturerType): void{
        this._lecturers.push(lecturer);
    }

    removeLecturer(lecturer: LecturerType): LecturerType[]{
        return this._lecturers.filter((x: LecturerType) => x !== lecturer);
    }

    get areas(): Area[] {
        return this._areas;
    }

    get lecturers(): LecturerType[] {
        return this._lecturers;
    }
}

class Area {
    // implement getters for fields and 'add/remove level' methods
    _levels: Level[] = [];
    _name: string;

    get levels(): Level[] {
        return this._levels;
    }

    get name(): string {
        return this._name;
    }

    addLevel(level: Level): void {
        this._levels.push(level);
    }

    removeLevel(level: Level): Level[]{
        return this._levels.filter((x: Level) => x !== level);
    }

    constructor(name: string) {
        this._name = name;
        this._levels = [];
    }
}

class Level {
    // implement getters for fields and 'add/remove group' methods

    _groups: Group[] = [];
    _name: string;
    _description: string;

    get groups(): Group[]{
        return this._groups;
    }

    get name(): string{
        return this._name;
    }

    get description(): string{
        return this._description;
    }

    addGroup(group: Group): void{
        this._groups.push(group);
    }

    removeGroup(group: Group): Group[]{
        return this._groups.filter((x: Group) => x !== group);
    }

    constructor(name: string, description: string) {
        this._name = name;
        this._description = description;
        this._groups = [];
    }
}

class Group {
    // implement getters for fields and 'add/remove student' and 'set status' methods

    _area: Area;
    _status: string;
    _students: Student[] = []; // Modify the array so that it has a valid toSorted method*
    _directionName: string;
    _levelName: string;

    get area(): Area{
        return this._area;
    }

    get status(): string{
        return this._status;
    }

    get students(): Student[]{
        return this._students;
    }

    get directionName(): string{
        return this._directionName;
    }

    get levelName(): string{
        return this._levelName;
    }

    constructor(directionName: string, levelName: string) {
        this._directionName = directionName;
        this._levelName = levelName;
    }

    addStudent(student: Student): void{
        this._students.push(student);
    }

    removeStudent(student: Student): Student[]{
        return this._students.filter((x: Student) => x!== student)
    }

    set status(status: string) {
        this._status = status;
    }

    showPerformance(): Student[] {
        return this._students.toSorted((a: Student, b: Student) => b.getPerformanceRating() - a.getPerformanceRating());
    }
}

class Student {
    // implement 'set grade' and 'set visit' methods

    _firstName: string;
    _lastName: string;
    _birthYear: number;
    _grades: {workName: string, mark: number}[] = []; // workName: mark
    _visits: {lesson: number, present: boolean}[] = []; // lesson: present

    constructor(firstName: string, lastName: string, birthYear: number) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
        this._grades = [];
        this._visits = [];
    }

    get fullName(): string {
        return `${this._lastName} ${this._firstName}`;
    }

    set fullName(value: string) {
        [this._lastName, this._firstName] = value.split(' ');
    }

    get age(): number {
        return new Date().getFullYear() - this._birthYear;
    }

    set grades(grade: {workName: string, mark: number}){
        this._grades.push(grade);
    }

    set visits(visit: {lesson: number, present: boolean}){
        this._visits.push(visit);
    }

    getPerformanceRating(): number {
        const gradeValues: {workName: string, mark: number}[] = Object.values(this._grades);

        if (!gradeValues.length) return 0;

        const averageGrade: number = gradeValues.reduce((sum: number, grade: {workName: string, mark: number}) => sum + grade.mark, 0) / gradeValues.length;
        const attendancePercentage: number = (this._visits.filter(present => present.present).length / this._visits.length) * 100;

        return (averageGrade + attendancePercentage) / 2;
    }
}