'use strict';

function calcAge(birthYear){
    const age = 2037 - birthYear;
    
    function printAge(){
        const output = `${firstName}, you are ${age}, born in ${birthYear}`
        console.log(output);

        if(birthYear >= 1981 && birthYear <= 1996){
            // Var is function scoped and can be accessd inside the function printAge
            var milennial = true;
            // Str is block scoped and only accessible within this if statement block
            const str = `Oh, and you are a milennial, ${firstName}`;
            console.log(str);
        }
        console.log(milennial);

    }
    printAge();
    
    return age;
}

const firstName = 'Noah';
// calcAge(1991);
// Below will not work because functions are block scoped... the global Execution context does not have access to PrintAge
// printAge();



//----Hoisting Refresher----\\


// below will show undefined
// console.log(me);

// below will return error saying can't access before intiliziation
// console.log(job);
// console.log(year);

// var me = 'Jonas'
// let job = 'teacher'
// const year = 1991;

// functions
// console.log(addDecl(2,3));
// console.log(addExpr(2,3));
// console.log(addArrow(2,3));

function addDecl(a,b){
    return a + b;
}

const addExpr = function (a,b){
    return a+b
}

const addArrow = (a,b) => a+b;

//because var is hoisted to undefined, the deleteShoppingCart function will run;
if(!numProducts){
    // deleteShoppingCart();
}

var numProducts = 10;

function deleteShoppingCart(){
    console.log('All products deleted!');
}

//----This Keyword Refresher----\\

console.log(this);

const calcAge2 = function(birthYear){
    console.log(2037 - birthYear);
    console.log(this);
};

calcAge2(1991);

const calcAge3 = (birthYear) => {
    console.log(2037 - birthYear);
    console.log(this);
};

calcAge3(1996);

const jonas = {
    firstName: 'Noah',
    year: 1991,
    calcAge: function () {
        console.log(this);
        console.log(2037 - this.year);

        // Solution1
        // const self = this;
        // const isMillenial = function(){
        //     console.log(self);
        //     console.log(self.year >= 1981 && self.year <= 1996);
        //     // console.log(this.year >= 1981 && this.year <= 1996);
        // }

        //Solution2 - Arrow function inherits the this keyword from the parent scope
        const isMillenial = () => {
            console.log(`This in an arrow function: ${this}`);
            console.log(this.year >= 1981 && this.year <= 1996);
            // console.log(this.year >= 1981 && this.year <= 1996);
        }
        isMillenial();
    },

    greet: () => {
        console.log(`Hey ${this.firstName}`)
    },
};

jonas.calcAge();

const matilda = {
    year: 2017,
};

matilda.calcAge = jonas.calcAge;

matilda.calcAge();

const f = jonas.calcAge;
// f() is just a regular function call... there is no owner to this function (no object is belongs to) that's why it returns undefined when referncing 'this'
// f();

//If 'this' is used in a regular function call, then 'this' is undefined even if inside a method.
jonas.greet();
jonas.calcAge();

// const addExpr = function (a,b){
//     return a+b;
// };

//Arguments exists in regular function declarations and expressions, but not in arrow functions




//----Primitives vs Objects----\\

// let age = 30;
// let oldAge = age;
// age = 31;
// console.log(age);
// console.log(oldAge);

// const me = {
//     name: 'Noah',
//     age: 30,
// };

// const friend = me;
// friend.age = 27;
// console.log('Friend',friend);
// console.log('Me', me);


//Primitive Types
let lastName = 'Williams';
let oldLastName =  lastName;
lastName = 'Davis';
console.log(lastName, oldLastName); //prints Davis, Williams\

//Reference Types
const jessica = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before Marriage: ', jessica);
console.log('After Marriage: ', marriedJessica);

//Copying object
const jessica2 = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
    family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';
console.log('Before Marriage: ', jessica2);
console.log('After Marriage: ', jessicaCopy);

jessicaCopy.family.push('Steve', 'Jackson');