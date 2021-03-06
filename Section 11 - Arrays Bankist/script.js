'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function(movements, sort = false){
    containerMovements.innerHTML = '';

    const movs = sort ? movements.slice().sort((a,b) => a-b) : movements;

    movs.forEach(function(mov, i){
        const type = mov > 0 ? 'deposit' : 'withdrawal';


        const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
            <div class="movements__date">3 days ago</div>
            <div class="movements__value">${mov}???</div>
        </div>
        
        `;

        containerMovements.insertAdjacentHTML('afterbegin',html);
    });
}


const calcDisplayBalance = function(acc){
    acc.balance = acc.movements.reduce((acc,mov)=> {
        return acc + mov;
    }, 0);
   
    labelBalance.textContent = `${acc.balance} EUR`
}


const calcDisplaySummary = (movements, interestRate) => {
    const incomes = movements.filter(mov => mov > 0).reduce((acc,mov) => acc + mov);
    const withdrawals = movements.filter(mov => mov < 0).reduce((acc,mov) => acc + mov);
    const interest = movements.filter(mov => mov > 0).map(deposit => (deposit * interestRate) / 100).filter(el => el >= 1 ).reduce((acc, int) => acc + int, 0);
    labelSumIn.textContent = `${incomes} EUR`;
    labelSumOut.textContent = `${withdrawals} EUR`;
    labelSumInterest.textContent = `${interest} EUR`;
};


const createUsernames = function(accounts){
    accounts.forEach(el => {
        el.username = el.owner.toLowerCase().split(' ').map( name => name[0]).join('')
        
        });
    }

createUsernames(accounts);

const updateUI = (acc) => {
    // Display Movements
    displayMovements(acc.movements);
    //Display Balance
    calcDisplayBalance(acc);
    //Dispaly Summary
    calcDisplaySummary(acc.movements, acc.interestRate);
};

// Event Handlers

let currentAccount;
btnLogin.addEventListener('click', function(e){
    // prevent form form submitting
    e.preventDefault();

    currentAccount = accounts.find(
        acc => acc.username === inputLoginUsername.value
    );
        console.log(currentAccount);

    if(currentAccount?.pin === Number(inputLoginPin.value)){
        // Display UI and message
        labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]}`;
        containerApp.style.opacity = 100;

        // Clear inptu fields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();
        updateUI(currentAccount);
    }
})

btnTransfer.addEventListener('click', function(e){
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
    inputTransferAmount.value = inputTransferTo.value = '';

    if(amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username){
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);
        updateUI(currentAccount);
    }
})

btnLoan.addEventListener('click', function(e){
    e.preventDefault();
    const amount = Number(inputLoanAmount.value);

    if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){
        //Add movement
        currentAccount.movements.push(amount);

        // Update UI
        updateUI(currentAccount);
        inputLoanAmount.value = '';
    }
});

btnClose.addEventListener('click', function(e){
    e.preventDefault();
    //check to see if current user is account that is being deleted as well as pin
    if(currentAccount.username === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value)){
        
       const index = accounts.findIndex(acc => acc.username === currentAccount.username);
        
       //Delete account
        accounts.splice(index, 1);
        // Hide UI
        containerApp.style.opacity = 0;
        
    }
    inputClosePin.value = inputCloseUsername.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function(e){
    e.preventDefault();
    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
let arr = ['a','b','c','d','e'];

// SLICE - keeps original array and returns a new one
console.log(arr.slice(2));
console.log(arr.slice(2,4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1,-2));
console.log(arr.slice());
console.log([...arr]);

// SPLICE - mutates original array
console.log(arr.splice(-1));
console.log(arr);

// REVERSE - mutates original array
arr = ['a','b','c','d','e'];
const arr2 = ['j','i','h','g','f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT - doesn't mutate original array
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN - returns string with specified separator
console.log(letters.join(' - '));
*/


// const arr = [23, 11, 64];
// console.log(arr[0]);
// console.log(arr.at(0));

// console.log(arr[arr.length-1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-1));

// console.log('jonas'.at(0))
// console.log('jonas'.at(-1))
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for(const movement of movements){
    if(movement > 0){
        console.log(`You deposited ${movement}`);
    } else {
        console.log(`You withdrew ${Math.abs(movement)}`);
    }
}

// cannot break out of a for each loop
movements.forEach(function(movement, index, array){
    if(movement > 0){
        console.log(`Movement ${index + 1}: You deposited ${movement}`);
    } else {
        console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
    }
})
*/

// Map
// const currencies = new Map([
//     ['USD', 'United States dollar'],
//     ['EUR', 'Euro'],
//     ['GBP', 'Pound sterling'],
//   ]);

//   currencies.forEach(function(val, key, map){
//     console.log(`${key}: ${val}`);
//   });

// // SET
// const currrenciesUnique = new Set(['USD','GBP','USD', 'EUR', 'EUR']);
// console.log(currrenciesUnique);

// currrenciesUnique.forEach(function(val,key, map){
//     console.log(`${key}: ${val}`);
// });

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/*
const eurToUsd = 1.1;

const movementsUsd = movements.map(mov => mov * eurToUsd);

console.log(movementsUsd);

movements.map()

*/

// console.log(movements);
// // Acc -> SNOWBALL
// const balance = movements.reduce(function(acc,cur, i , arr){
//     console.log(`Iteration ${i}: ${acc}`);
//     return acc + cur;
// }, 0);

// console.log(balance);

// const max = movements.reduce((acc, mov) => {
//     if (acc > mov)
//         return acc;
//     else
//         return mov;
// }, movements[0]);

// const dogAges1 = [5,2,4,1,15,8,3];
// const dogAges2 = [16, 6, 10, 5, 6, 1, 4];
// const calcAverageHumanAge = (ages) => {
//     const humanAge = ages.map(el => {
//         if(el <= 2){
//             return el*2;
//         }else if(el > 2){
//             return (el*4) + 16;
//         }
//     });

//     console.log('human age array:' + humanAge)

//     const humanAgeFiltered = humanAge.filter(el => el >= 18);
//     console.log('human age filtered: ' + humanAgeFiltered)

//     const avgAge = humanAgeFiltered.reduce((acc,cur)=>{
//         return acc + cur;
//     })/humanAgeFiltered.length;

//     return avgAge
// }

// console.log('Avg age:' + calcAverageHumanAge(dogAges1));
// console.log('Avg age:' + calcAverageHumanAge(dogAges2));
// const eurToUsd = 1.1;
// const totalDeposit = movements
// .filter(mov => mov > 0)
// .map(mov => mov * eurToUsd)
// .reduce((acc, mov) => acc + mov,0);

// console.log(totalDeposit);

// find only finds first element of array and just the element itself not a new array like filter
// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account)

console.log(movements);
// console.log(movements.includes(-130));

// const anyDeposits = movements.some(mov => mov > 1500);
// console.log(anyDeposits);

// // Every - checks to see if alla elements in the array satisfies the condition
// console.log(movements.every(mov => mov > 0));


// const arr = [[1,2,3], [4,5,6], 7, 8];
// console.log(arr.flat());

// const arrDeep = [[[1,2],3], [4,[5,6]], 7, 8];


