//Вам потрібно створити тип DeepReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів.
interface IDeepReadonly {
    field: string;
    obj: {name: string, age: number}
}

type DeepReadonly<T> = {
    +readonly[K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
}

const WithoutDeepReadonly: IDeepReadonly = {
    field: "Arina",
    obj: {name: "Christina",
        age: 19}};

const addDeepReadonly: DeepReadonly<IDeepReadonly> = {
    field: "Arina",
    obj: {name: "Christina",
        age: 19}};



//Вам потрібно створити тип DeepRequireReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів та ще й робити їх обовʼязковими.
interface IDeepRequiredReadonly {
    field?: string;
    obj: {name: string, age?: number}
}

type DeepRequiredReadonly<T> = {
    +readonly[K in keyof T]-?: T[K] extends object ? DeepRequiredReadonly<T[K]> : T[K];
}

const WithoutDeepRequiredReadonly: IDeepRequiredReadonly = {
    obj: {name: "Christina"}};

const addDeepRequiredReadonly: DeepRequiredReadonly<IDeepRequiredReadonly> = {
    field: "Arina",
    obj: {name: "Christina",
        age: 19}};



//Вам потрібно створити тип UpperCaseKeys, який буде приводити всі ключі до верхнього регістру.
interface IUpperCaseKeys {
    field: string;
    obj: {name: string, age: number}
}

type UpperCaseKeys<T> = {
    [K in keyof T as Uppercase<K>] : T[K];
}

const lowercase: IUpperCaseKeys = {
    field: "Arina",
    obj: {name: "Name", age: 29}
}

const uppercase: UpperCaseKeys<IUpperCaseKeys> = {
    FIELD: "Arina",
    OBJ: {name: "Name", age: 29}
}


//Створіть тип ObjectToPropertyDescriptor, який перетворює звичайний обʼєкт на обʼєкт де кожне value є дескриптором.
interface IObjectToPropertyDescriptor {
    field: string;
}

type ObjectToPropertyDescriptor<T> = {
    [K in keyof T]: {
        value: T[K],
        writable: boolean;
        configurable: boolean;
        enumerable: boolean;
        get: () => T[K];
        set: (value: T[K]) => void
    };
};

const obj: IObjectToPropertyDescriptor = {
    field: "Arina",
}

const objDescriptor: ObjectToPropertyDescriptor<IObjectToPropertyDescriptor> = {
    field : {
        value: "Arina",
        writable: true,
        configurable: true,
        enumerable: true,
        get: () => "Arina",
        set: (name: string) => {
            name = "Arina";
        }
    }
}