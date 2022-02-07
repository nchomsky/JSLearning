'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');


const renderCountry = (data, className = '') => {

    const html = `<article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(+data.population / 100000).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
    </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    // countriesContainer.style.opacity = 1;
}

const renderError = function(msg){
    countriesContainer.insertAdjacentText('beforeend', msg);
    // countriesContainer.style.opacity = 1;
}

///////////////////////////////////////
// Our First AJAX Call: XMLHttpRequest

/*
const getCountryDataAndNeighbor = function(country){
    //ajax call country 1
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v2/name/${country}`);
    request.send();

    request.addEventListener('load', function(){
        const [data] = JSON.parse(this.responseText);
        console.log(data);
        //render country 1
        renderCountry(data);

        //Get neighbor country 2
        const [neighbor] = data.borders;

        if(!neighbor) return;
        //ajax call country 2
        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`);
        request2.send();

        request2.addEventListener('load', function(){
            const data2 = JSON.parse(this.responseText);

            renderCountry(data2, 'neighbour');
        })
    });
};

const getCountryData = function(country){
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v2/name/${country}`);
    request.send();

    request.addEventListener('load', function(){
        const [data] = JSON.parse(this.responseText);
        console.log(data);
        renderCountry(data);
    });
};

//getCountryData('portugal');
getCountryDataAndNeighbor('portugal');
// getCountryData('usa');
// getCountryData('germany');
*/

// const request = fetch('https://restcountries.com/v2/name/portugal');
// console.log(request)

// const getCountryData = function(country) {
//     fetch(`https://restcountries.com/v2/name/${country}`)
//       .then((response)=>{
        
//     }).then(([data]) => {
//         renderCountry(data);
//         const neighbor = data.borders[0];

//         if(!neighbor) return;
//         //Country 2
//         return fetch(`https://restcountries.com/v2/alpha/${neighbor}`)  
//     })
//     .then(response =>response.json())
//     .then(data => {renderCountry(data, 'neighbour')})
//     .catch(err => {
//         console.error('This is my error:' + err);
//         renderError('Something went wrong ' + err.message);
//     })
//     .finally(()=>{
//         countriesContainer.style.opacity = 1;
//     });

// }

const getJSON = function(url, errorMsg = 'Something went wrong'){
    return fetch(url).then(response => {
        console.log(response)
        if(!response.ok){
            throw new Error(`Country not found ${response.status}`)
        }
        //.json is also an asynchronous function so it will return a promise
        return response.json();
    });
};



const getCountryData = function(country) {
    getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(([data]) => {
        renderCountry(data);
        const neighbor = data.borders[0];

        if(!neighbor) throw new Error('No neighbor found');
        //Country 2
        return getJSON(`https://restcountries.com/v2/alpha/${neighbor}`, 'Country not found')
    })  
    .then(data => {renderCountry(data, 'neighbour')})
    .catch(err => {
        console.error('This is my error:' + err);
        renderError('Something went wrong ' + err.message);
    })
    .finally(()=>{
        countriesContainer.style.opacity = 1;
    });

}
btn.addEventListener('click', () => {
    getCountryData('portugal');
    // getCountryData('dsfssddsds');
})



//Coding Challenge 1
const whereAmI = (lat, lng) => {

    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=23160697070431265000x58174`).then(response => {
        //console.log(response.json());
        return response.json();
    }).then((data) => {
        console.log(data)
        console.log(`You are in ${data.city}, ${data.country}`);
    }).catch(err => {
        console.log(`this is my error: ${err}`);
    })
};

whereAmI('52.508', '13.381')
