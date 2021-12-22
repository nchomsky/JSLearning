'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

// creates a nodeList of the elements
const btnsOpenModal = document.querySelectorAll('.show-modal');

for(let i = 0; i < btnsOpenModal.length; i++){
    btnsOpenModal[i].addEventListener('click', () => {
        console.log('Button clicked');
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    });
}

const closeModal = () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

btnCloseModal.addEventListener('click', () => {
    closeModal();
})

overlay.addEventListener('click', () => {
    closeModal();
})