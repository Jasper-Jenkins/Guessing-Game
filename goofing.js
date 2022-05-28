// JavaScript source code

document.body.onload = CreateCharacter("Jasper");

function CreateCharacter(characterName) {
    //const gameHolder = document.createElement("div");
    //gameHolder.setAttribute("id", "game");

    //const first = document.getElementById("first");
    //document.body.insertBefore(gameHolder, first);

    //const resultParas = document.createElement("div");
    //resultParas.setAttribute("class", "resultParas");
    //gameHolder.appendChild(resultParas);

    //const guessResultRange = ["guesses", "lastResult", "lowOrHi"];
    //for (element in guessResultRange) {
    //    const htmlElement = document.createElement("p");
    //    htmlElement.setAttribute("class", guessResultRange[element]);
    //    resultParas.appendChild(htmlElement);
    //}



    const obj = {};
    obj.name = characterName;
    obj.sayHello = function() {
        console.log("Hello my name is " + obj.name + ".");
    };
    return obj;
    
};

function Toon(name) {
    this.name = name;    
};

const toonPrototype = {
    greet() {
        if (this.name == "Tate") {
            console.log(`Hello my name is ${this.name}. I am an awesome kid.`);
        } else {
            console.log(`Hello my name is ${this.name}. I am a cool adult.`);        }
    }
};

Toon.prototype = toonPrototype;
Toon.prototype.constructor = Toon;

class Shape {
    name;
    sides;   
    constructor(name, sides) {
        this.name = name;
        this.sides = sides;
    };

    shapeStats() {
        console.log(`Name: ${this.name}, Sides: ${this.sides} `)
    };
};

class Square extends Shape {
    name = 'square'
    sideLength;
    constructor(sideLength) {
        super();
        //this.name = 'square';
        this.sides = '4';
        this.sideLength = sideLength;
    };

    calcPerimeter() {
        console.log(`${this.name} shape has ${this.sides} sides with a perimeter of ${(this.sideLength + this.sideLength) * 2}`);
    };
};

const square = new Square(10);
square.calcPerimeter();
const shape = new Shape('triangle', 3);
shape.shapeStats();
square.shapeStats();
