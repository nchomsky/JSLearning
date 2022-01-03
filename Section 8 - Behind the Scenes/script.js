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
calcAge(1991);
// Below will not work because functions are block scoped... the global Execution context does not have access to PrintAge
// printAge();



//----Hoisting Refresher----\\


// below will show undefined
console.log(me);

// below will return error saying can't access before intiliziation
// console.log(job);
// console.log(year);

var me = 'Jonas'
let job = 'teacher'
const year = 1991;

// functions
console.log(addDecl(2,3));
console.log(addExpr(2,3));
console.log(addArrow(2,3));

function addDecl(a,b){
    return a + b;
}

const addExpr = function (a,b){
    return a+b
}

const addArrow = (a,b) => a+b;


var numProducts = 10;

function deleteShoppingCart(){
    console.log('All products deleted!');
}