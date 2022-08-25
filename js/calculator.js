'use strict'

const numButtons = document.querySelectorAll('div.calculator .btn-nums');
const operatorButtons = document.querySelectorAll('div.calculator .btn-operator');
const equalsButton = document.querySelectorAll('div.calculator .btn-equals');
const clearButton = document.querySelectorAll('div.calculator .btn-clear');
const decimalButton = document.querySelectorAll('div.calculator .btn-decimal');

let accu = '';
let enabledButtons = ['0','1','2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', 'c', '=']
const displayNumbers = document.querySelector('.displayDigits');

// Button actions:

const clearScreen = function() {
        accu = '';
        displayNumbers.innerHTML='0';
    }

const addDecimal = function() {
    accu += '.'
    displayNumbers.innerHTML=accu;
}

const calcResult = function() {
    accu += '=';
    displayNumbers.innerHTML=accu;
}

const numButtonEventHandler = function(button) {
    accu += button;
    displayNumbers.innerHTML=accu;
}

const operatorButtonEventHandler = function(button) {
    accu += button;
    displayNumbers.innerHTML=accu;
}


// Button listeners:
const addClearButtonListener = () => {
        clearButton[0].addEventListener("click", () => clearScreen());
   };
//
const addDecimalButtonListener = () => {
        decimalButton[0].addEventListener("click", addDecimal);
   };
//
const addEqualsButtonListener = () => {
        equalsButton[0].addEventListener("click", calcResult);
   };
//
const addOperatorButtonsListener = () => {    
    for (let i = 0; i < operatorButtons.length; i += 1) {
         operatorButtons[i].addEventListener("click", () => 
         operatorButtonEventHandler(operatorButtons[i].getAttribute("data-btn")));
        };
    };
//
const addNumButtonsListener = () => {    
    for (let i = 0; i < numButtons.length; i += 1) {
         numButtons[i].addEventListener("click", () => 
         {numButtonEventHandler(numButtons[i].getAttribute("data-btn"));}
         );
        };
    };

addClearButtonListener();
addDecimalButtonListener();
addNumButtonsListener();
addOperatorButtonsListener();
addEqualsButtonListener();