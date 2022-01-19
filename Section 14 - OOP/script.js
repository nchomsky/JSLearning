'use strict';
/*
const Person = function(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;

    // Never do this
    // this.calcAge = function(){
    //     console.log(2037-this.birthYear);
    // }
}

const jonas = new Person('Jonas', 1996);
console.log(jonas);

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 2000);

Person.prototype.calcAge = function (){
    console.log(2037 - this.birthYear);
}

jonas.calcAge();
matilda.calcAge();

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

console.log(jonas.__proto__);

// Object.prototype is the top of the prototype chain:
console.log(jonas.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3,6,4,5,6,9,3];
// console.log(arr.__proto__.__proto__);

//Not good to add a method to a built-in object in javascript (such as an array)
Array.prototype.unique =  function(){
    return [...new Set(this)];
};

// console.log(arr.unique);

const h1 = document.querySelector('h1');
*/

// -----------------------------Coding Challenge #1------------------------------

// Arrow functions do not work because they do not have their own this keyword ( they point to the this keyword in the lexical environment( the env they are declared in))
const Car = function(make, speed){
    this.make = make;
    this.speed = speed;
}

Car.prototype.accelerate = function(){
    this.speed += 10;
    console.log(`The current speed of ${this.make} is ${this.speed}`);
}

Car.prototype.brake = function(){
    this.speed -= 5;
    console.log(`The current speed of ${this.make} is ${this.speed}`);
}

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

/*
// class expression
//const personCl = class {}

//class declaration
class PersonCl {
    constructor(fullName, birthYear){
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    //instance methods
    calcAge(){
        console.log(2037 - this.birthYear);
    }

    greet(){
        console.log(`Hey ${this.fullName}`);
    }

    get age(){
        return 2037 - this.birthYear;
    }

    // Set a property that already exists
    set fullName(name){
        if(name.includes(' ')){
            this._fullName = name
        } else {
            alert(`${name} is not a fullName`)
        }
    }


    get fullName(){
        return this._fullName;
    }

    //static method
    static hey(){
        console.log('Hey There');
        console.log(this);
    }
}

const jessica = new PersonCl('Jessica Davis', 1996);
// console.log(jessica);
// jessica.calcAge();

// PersonCl.prototype.greet = function(){
//     console.log(`Hey ${this.firstName}`);
// }

// jessica.greet();

const walter = new PersonCl('Walter White', 1965);
*/
// 1. Classes are not hoisted (cannot use before declared)
// 2. Classes are first-class citizens
// 3. Classes are executed in strict mode;
/*
const account = {
    owner: 'Jonas',
    movements: [200, 530, 120, 300],

    get latest(){
        return this.movements.slice(-1).pop();
    },
    
    set latest(mov){
        this.movements.push(mov)
    },
};

console.log(account.latest);

account.latest = 50;
console.log(account.movements)

*/
/*
// use object.create to manually set the prototype to any object we want
const PersonProto =  {
    calcAge(){
        console.log(2037 - this.birthYear);
    },

    init(firstName, birthYear){
        this.firstName = firstName;
        this. birthYear = birthYear;
    }
};

// Creates a brand new object linked to the prototype passed as a parameter
// Least used way to of implementing prototypal inheritance
const steven = Object.create(PersonProto);
// console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
// steven.calcAge();

// console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
// sarah.init('Sarah', 1979);
// sarah.calcAge();
*/


//----------------------------------------------------------------------------------------------
//Coding Challenge 2 - Recreate prev car class using ES6 classes

class CarCl {
    constructor(make, speed){
        this.make = make;
        this.speed = speed;
    }

    accelerate(){
        this.speed += 10;
        console.log(`The current speed of ${this.make} is ${this.speed}`);
    }

    brake(){
        this.speed -= 5;
        console.log(`The current speed of ${this.make} is ${this.speed}`);
    }

    get speedUS(){
        return this.speed / 1.6;
    }

    set speedUS(mph){
        this.speed = mph * 1.6;
    }
}

const ford = new CarCl('Ford', 120);

// ford.brake();
// ford.brake();
// ford.accelerate();
// ford.accelerate();
//using the getter
// console.log(ford.speedUS);
// using the setter
ford.speedUS = 50;
// console.log(ford)




//  ---------------------------------------------------------------------------
// Inheritance Between "classes": constructor functions
const Person = function(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
}

Person.prototype.calcAge = function (){
    console.log(2037 - this.birthYear);
}


const Student = function (firstName, birthYear, course){
    Person.call(this,firstName, birthYear);
    this.course = course;

};

// Essentially we want to make the person.prototype the prototype of student.prototype
//We want to inherit from the Person object, but not be the exact same object as Person
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function(){
    console.log(`My name is ${this.firstName} and I study ${this.course}`)
}

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike)
mike.introduce();
mike.calcAge();

Student.prototype.constructor = Student;
console.log(mike.__proto__)
console.log(mike.__proto__.__proto__)

//----------------------------------------------------------------------------------
//Coding challenge 3
const EV = function(make, speed, charge){
    //using call to immediately call the class and set the 'this' keyword to the current object
    Car.call(this,make, speed);
    this.charge = charge;
}

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function(chargeTo){
    this.charge = chargeTo;
}

EV.prototype.accelerate = function(){
    this.speed += 20;
    this.charge -= 1;
    console.log(`The ${this.make} is going ${this.speed} and the charge is now ${this.charge}%`);
}

const tesla = new EV('Tesla', 120, 23);
tesla.accelerate();
tesla.chargeBattery(28);
tesla.accelerate();

//--------------------------------------------------------------------------
//Inheritance Between "Classes": ES6 Classes

class PersonCl {
    constructor(fullName, birthYear){
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    //instance methods
    calcAge(){
        console.log(2037 - this.birthYear);
    }

    greet(){
        console.log(`Hey ${this.fullName}`);
    }

    get age(){
        return 2037 - this.birthYear;
    }

    // Set a property that already exists
    set fullName(name){
        if(name.includes(' ')){
            this._fullName = name
        } else {
            alert(`${name} is not a fullName`)
        }
    }


    get fullName(){
        return this._fullName;
    }

    //static method
    static hey(){
        console.log('Hey There');
        console.log(this);
    }
}

class StudentCl extends PersonCl {
    constructor(fullName, birthYear, course){
        // Super always needs to happen first
        super(fullName, birthYear);
        this.course = course;
    }

    introduce(){
        console.log(`My name is ${this.fullName} and I study ${this.course}`)
    }

    calcAge() {
        console.log(`Child method`);
    }


}


const martha = new StudentCl('Martha Jones', 2012, 'Computer Science')
martha.introduce();
martha.calcAge();

///////////////////////////////////////////////////////////////
// Inheritance Between "Classes": Object.create

const PersonProto = {
    calcAge(){
        console.log(2037 - this.birthYear);
    },

    init(firstName, birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function(firstName, birthYear, course){
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
}

StudentProto.introduce = function(){
    console.log(`Hi my name is ${this.firstName}`);
}

const jay = Object.create(StudentProto);
jay.init('Jay', 1996, 'Math')
jay.introduce();
jay.calcAge();


//----------------------------------------------------------------------------------
//Coding challenge 4 

class EVCl extends CarCl{

    //private fields
    #charge;
    constructor(make, speed, charge){
        super(make, speed);
        this.#charge = charge;
    }

    // return this to return the current object (method chaining)
    chargeBattery(chargeTo){
        this.#charge = chargeTo;
        return this;
    }

    accelerate(){
        this.speed += 20;
        this.charge -= 1;
        console.log(`The ${this.make} is going ${this.speed} and the charge is now ${this.#charge}%`);
        return this;
    }

    brake(){
        this.speed -= 10;
        console.log(`The current speed of ${this.make} is ${this.speed}`);
        return this;
    }

}

const rivian = new EVCl('Rivian', 120, 23);
rivian.accelerate().brake().chargeBattery(50).accelerate();;