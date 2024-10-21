//Визначте інтерфейс, який використовує сигнатуру індексу з типами об'єднання. Наприклад, тип значення для кожного ключа може бути число | рядок.
interface IUnionSignature{
    [key: string]: string | number;
}

let obj1:IUnionSignature = {
    stringKey : "hello",
    numberKey : 12
};


//Створіть інтерфейс, у якому типи значень у сигнатурі індексу є функціями. Ключами можуть бути рядки, а значеннями — функції, які приймають будь-які аргументи.
interface IFunctionSignature {
    [key: string]: (...args: any[]) => any;
}

let obj2:IFunctionSignature = {
    voidFunc: () => console.log("Hello world"),
    numberFunc: (a: number, b: number) => a + b,
    stringFunc: (name: string) => "Hello" + name
}

//Опишіть інтерфейс, який використовує сигнатуру індексу для опису об'єкта, подібного до масиву. Ключі повинні бути числами, а значення - певного типу.
interface IArraySignature{
    [key: number]: string;
}

let obj3:IArraySignature = {
    0 : "hello",
    1 : "world",
    2 : "hi",
    3 : "space"
}

//Створіть інтерфейс з певними властивостями та індексною сигнатурою. Наприклад, ви можете мати властивості типу name: string та індексну сигнатуру для додаткових динамічних властивостей.
interface IPropertiesSignature{
    [key: string]: string | number | boolean;

    name: string;
    age: number;
    isAlive: boolean;
}

let person:IPropertiesSignature = {
    name: "Arina",
    age: 20,
    isAlive: true
};
person["hasCat"] = true;

//Створіть два інтерфейси, один з індексною сигнатурою, а інший розширює перший, додаючи специфічні властивості.
interface IBase{
    [key: string]: string | number;
    name: string;
}

interface IDesc extends IBase{
    cat: string;
}

let personSpec:IDesc = {
    name: "Arina",
    age : 19,
    cat: "has",
};

//Напишіть функцію, яка отримує об'єкт з індексною сигнатурою і перевіряє, чи відповідають значення певних ключів певним критеріям (наприклад, чи всі значення є числами).
interface ICriteriaCheck{
    [key: string] : string | number;
}

let objCheck:ICriteriaCheck = {
    arina: "hi",
    dog: 11,
    hello: 29,
    city: "Dnipro",
    numbers: "1234",
    cars: 390
}

const checkingFunction = (obj: ICriteriaCheck, keysToCheck: string[]): boolean => {
    return keysToCheck.every(key => typeof obj[key] === 'number');
}

let keysToCheck: string [] = ["hello", "dog"];

console.log(`Is every key in the list a number value? ${checkingFunction(objCheck, keysToCheck)}`);
