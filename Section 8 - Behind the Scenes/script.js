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