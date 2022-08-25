'use strict'

const numButtons = document.querySelectorAll('div.calculator .btn-nums');
const operatorButtons = document.querySelectorAll('div.calculator .btn-operator');
const equalsButton = document.querySelectorAll('div.calculator .btn-equals');
const clearButton = document.querySelectorAll('div.calculator .btn-clear');
const decimalButton = document.querySelectorAll('div.calculator .btn-decimal');

let stringToDisplay;
let lastOperand;
let accu;
let enabledButtons;
//enabledButtons = ['0','1','2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', 'x', '/', 'c', '=']

const displayNumbers = document.querySelector('.displayDigits');


// Button actions:
const clearScreen = function() {
    stringToDisplay = '0';
    lastOperand = '0';
    accu = 0;
    enabledButtons = ['1','2', '3', '4', '5', '6', '7', '8', '9', '.', 'c', '=']
    displayNumbers.innerHTML='0';
    }

const addDecimal = () => {
    if (enabledButtons.includes('.')){
        stringToDisplay += '.';
        lastOperand += '.';
        displayNumbers.innerHTML=stringToDisplay;
        enabledButtons = enabledButtons.filter(item => item !=='.')
    }  
}

const numButtonEventHandler = (button) => {
    if (button =='0' && lastOperand == '') {}else{
        enabledButtons = enabledButtons.concat(['0', '+', '-', 'x', '/']);
        if (lastOperand == '0') {
            lastOperand = '';
            stringToDisplay = stringToDisplay.slice(0, -1);
        }
        stringToDisplay += button;
        lastOperand += button;
        displayNumbers.innerHTML=stringToDisplay;
    }
}

const operatorButtonEventHandler = (button) => {
    if (enabledButtons.includes(button)){
        stringToDisplay += button;
        lastOperand = '';
        displayNumbers.innerHTML=stringToDisplay;
        enabledButtons.push('.');
        enabledButtons = enabledButtons.filter(item => !['+', '-', 'x', '/'].includes(item));
    }
}

const calcResult = () => {
    stringToDisplay += '=';
    displayNumbers.innerHTML=stringToDisplay;
}

// Button listeners:
const addClearButtonListener = () => {
        clearButton[0].addEventListener("click", () => clearScreen());
   };
const addDecimalButtonListener = () => {
        decimalButton[0].addEventListener("click", addDecimal);
   };
const addEqualsButtonListener = () => {
        equalsButton[0].addEventListener("click", calcResult);
   };
const addOperatorButtonsListener = () => {    
    for (let i = 0; i < operatorButtons.length; i += 1) {
         operatorButtons[i].addEventListener("click", () => 
         operatorButtonEventHandler(operatorButtons[i].getAttribute("data-btn")));
        };
    };
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
clearScreen();