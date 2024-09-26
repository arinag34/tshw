abstract class Figure{
    public abstract readonly COLOR: string;
    public abstract readonly NAME: string;

    public abstract calculateArea(): number;
}

class Circle extends Figure{
    constructor(public radius: number,
                public readonly COLOR: string,
                public readonly NAME: string) {
        super();
    }

    public override calculateArea(): number{
            return Math.PI * Math.pow(this.radius, 2);
    }
}

class Rectangle extends Figure{
    constructor(public height: number,
                public width: number,
                public readonly COLOR: string,
                public readonly NAME: string){
        super();
    }

    public override calculateArea(): number {
        return this.height * this.width;
    }

    public print(): void{
        console.log(`Formula: height * width = ${this.height} * ${this.width} = ${this.calculateArea()}`);
    }
}

class Square extends Rectangle{
    constructor(side: number,
                public readonly COLOR: string,
                public readonly NAME: string){
        super(side, side, COLOR, NAME);
    }
}

class Triangle extends Figure{
    constructor(public base: number,
                public perpendicular_height: number,
                public readonly COLOR: string,
                public readonly NAME: string) {
        super();
    }

    public override calculateArea(): number {
        return (this.base * this.perpendicular_height) / 2;
    }
}

let circle:Circle = new Circle(12, "Red", "Circle");
console.log(circle.calculateArea());
//circle.COLOR = "Black"; (error)

let rectangle:Rectangle = new Rectangle(12, 10, "Green", "Rectangle");
rectangle.print();

let square:Square = new Square(12, "Yellow", "Square");
square.print();
console.log(`${square.COLOR} and ${square.NAME}`);

let rectSquare:Square = new Rectangle(12, 12, "Orange", "RectSquare");
rectSquare.print();
console.log(`${rectSquare.COLOR} and ${rectSquare.NAME}`);

let triangle:Triangle = new Triangle(12, 19, "Pink", "Triangle");
console.log(triangle.calculateArea());