'use strict';

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