'use strict'
const allButtons = document.querySelectorAll('div.calculator .btn');
let accu = '';
let enabledButtons = ['0','1','2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', 'c', '=']
const displayNumbers = document.querySelector('.displayDigits');


const clearScreen = () => {
    
}

const addButtonListener = () => {    
    for (let i = 0; i < allButtons.length; i += 1) {
         allButtons[i].addEventListener("click", () => 
         {buttonEventHandler(allButtons[i].getAttribute("data-btn"))}
         );

    };
    }

const buttonEventHandler = (button) => {
    accu += button
    displayNumbers.innerHTML=accu;
}

addButtonListener();