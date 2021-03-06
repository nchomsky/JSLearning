'use strict';

const bookings = [];

const createBooking = function(flightNum,  numPassengers = 1, price = 199 * numPassengers){
    // ES5
    // numPassengers = numPassengers || 1;
    // price = price || 199;

    const booking = {
        flightNum,
        numPassengers,
        price
    }
    // console.log(booking);
    bookings.push(booking);
}

createBooking('LH123');
createBooking('LH123', 2, 800);

const flight = 'LH234';
const jonas = {
    name: 'Jonas Schmedtmann',
    passport: 247567890
}

const checkIn = function(flightNum, passenger){
    flightNum ='LH999';
    passenger.name = 'Mr. ' + passenger.name;

    if(passenger.passport === 247567890){
        alert('Checked In');
    } else {
        alert('Wrong passport')
    }
};

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

const newPassport = function(person){
    person.passport = Math.trunc(Math.random() * 1000000000000);
}

// newPassport(jonas);
// checkIn(flight, jonas);



// Callback Functions

const oneWord = function(str){
    return str.replace(/ /g, '').toLowerCase();
}

const upperFirstWord = function(str){
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
}


//Higher-Order function
const transformer = function(str, fn){
    console.log(`Original String: ${str}`);
    console.log(`Transformed String: ${fn(str)}`);

    console.log(`Transformed by: ${fn.name}`);
}

transformer('Javascript is the best!', upperFirstWord);
transformer('Javascript is the best!', oneWord);



//Functions Returning Functions

const greet = function(greeting){
    return function(name){
        console.log(`${greeting} ${name}`)
    };
}


const greeter = greet('Hey');
greeter('Noah');

greet('Hello')('Steve');

const greetArr = (greeting) => (name) => console.log(`${greeting} ${name}`);

greetArr('Hellloooo')('Bob');



// Call and apply Methods

const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    book(flightNum, name){
        console.log(`${name} booked a seat from ${this.airline} flight ${this.iataCode}${flightNum}`);

        this.bookings.push({flight: `${this.iataCode}${flightNum}`, name})
    },
};

lufthansa.book(239, 'Noah Chomsky');
lufthansa.book(139, 'Bob Smith');
console.log(lufthansa.bookings)

 const eurowings = {
     name: 'Eurowings',
     iataCode: 'EW',
     bookings: [],
     
 };

 const book = lufthansa.book;
// Does not Work
//book(23, 'Sarah WIlliams')

// call method let us decide what the 'this' keyword pointed to. In this case we decided it pointed to the eurowings object
book.call(eurowings, 23, 'Sarah williams')
console.log(eurowings)

const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: [],
};

book.call(swiss, 23, 'Dave Filson')
console.log(swiss)

// Apply Method - Not used anymore (because we can use the call method and use the spread operator)
const flightData = [583, 'George cooper'];
book.apply(swiss, flightData);
console.log(swiss);




//Bind Method - returns a new function where the this keyword is bound

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23,'Steven Williams');

console.log(eurowings)

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Noah chomsky');
bookEW23('MArtha Cooper');

//With event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function(){
    console.log(this);

    this.planes++;
    console.log(this.planes);
}

// binding the function to lufthansa object (otherise the thiskeyword would point to the element with the class called '.buy')
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa))


// Partial Application
const addTax = (rate, value) =>  value + value*rate;

console.log(addTax(0.1, 200))

// Essentially presetting the value of a function for a specific use case
const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100))

const addVAT2 = (rate) => (value) => {
    return value + value*rate
}
console.log(addVAT2(.23)(100))



const poll = {
    question: 'What is your favorite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    answers: new Array(4).fill(0),
    registerNewAnswer(){
        const answer = prompt(`${this.question}\n ${this.options.join('\n')}\n(Write option number)`);
        if(answer>=0 && answer<this.options.length){
            this.answers[answer] = this.answers[answer] + 1;
        }
        this.displayResults();
    },
    displayResults(type = 'array'){
        if(type === 'array'){
            console.log(this.answers);
        } else if(typeof type === 'string') {
            console.log(`Poll results are ${this.answers.join(', ')}`);
        }
    },
};

document.querySelector('.poll').addEventListener('click',poll.registerNewAnswer.bind(poll));



const runOnce = function(){
    console.log('This will never run again');
}
runOnce();

// IIFE - Immediately Invoked function Expression
(function(){
    console.log('This will never run again');
    // encapsulated inside of this function scope created here - can't access outside of this
    const isPrivate = 23;
})();

{
    const isPrivate = 23;
    var notPrivate = 46;
}

console.log(notPrivate)





// Closures - makes a function remember all the variables that existed when the function was created
// Every function always has access to the variable environment of the execution context in which it was created (this connection is called closure... the variable environment that is attached to the function)

const secureBooking = function(){
    let passengerCount = 0;

    return function(){
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    }
}

const booker = secureBooking();
booker();
booker();

console.dir(booker);

//Exmaple 1 of Closures
let f;

const g = function(){
    const a = 23;
    f = function(){
        console.log(a*2);
    }
}

const h = function(){
    const b = 777;
    f = function(){
        console.log(b*2);
    };
}

g();
f();
console.dir(f)

// Reassigning f function
h();
f();
console.dir(f)

//Exmaple 2 of Closures
const boardPassengers = function(n, wait){
    const perGroup = n / 3;

    setTimeout(function(){
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000);

    console.log(`will start boarding in ${wait} seconds`);
}

// Closure has priority over scope-chain will not use this value even though boardPassengers popped off the execution context
const perGroup = 1000;
boardPassengers(180,3);

(function(){
    const header = document.querySelector('h1');
    header.style.color = 'red';
    document.querySelector('body').addEventListener('click', () => {
        header.style.color = 'blue';
    })
    console.log('IIFE has run')
})();