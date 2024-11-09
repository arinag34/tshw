//1) Вам потрібно створити умовний тип, що служить для встановлення типу, що повертається з функції. Як параметр типу повинен обов'язково виступати функціональний тип.
type FunctionReturnType<T> = T extends (...args: any[]) => infer U ? U : never;

function str(): string{
    return "Hello"
}

let a: FunctionReturnType<typeof str>

//2) Вам потрібно створити умовний тип, який приймає функціональний тип з одним параметром (або задовільним) та повертає кортеж, де перше значення - це тип, що функція повертає, а другий - тип її параметру.
type TrupleType<T> = T extends (param: infer U) => infer R ? [R, U] : never;

function numstr(a:number): string{
    return "Hi"
}

let b: TrupleType<typeof numstr>