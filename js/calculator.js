'use strict'

const numButtons = document.querySelectorAll('div.calculator .btn-nums');
const operatorButtons = document.querySelectorAll('div.calculator .btn-operator');
const equalsButton = document.querySelectorAll('div.calculator .btn-equals');
const clearButton = document.querySelectorAll('div.calculator .btn-clear');
const decimalButton = document.querySelectorAll('div.calculator .btn-decimal');

let stringToDisplay = '';
let lastOperand;
let enabledButtons;
//enabledButtons = ['0','1','2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', 'x', '/', 'c', '=']

const displayNumbers = document.querySelector('.displayDigits');


// Button actions:
const clearScreen = function() {
    stringToDisplay = '0';
    lastOperand = '0';
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
    if (button =='0' && lastOperand == '0') {}else{
        enabledButtons = enabledButtons.concat(['0', '+', '-', 'x', '/']);
        if (lastOperand == '0') {
            lastOperand = '';
            stringToDisplay = stringToDisplay.slice(0, -1);
        }
        if (lastOperand.length <10){
            stringToDisplay += button;
            lastOperand += button;
            displayNumbers.innerHTML=stringToDisplay;
        }
    }
}

const operatorButtonEventHandler = (button) => {
    if (enabledButtons.includes(button)){
        stringToDisplay += ` ${button} `;
        lastOperand = '';
        displayNumbers.innerHTML=stringToDisplay;
        enabledButtons.push('.');
        enabledButtons = enabledButtons.filter(item => !['+', '-', 'x', '/'].includes(item));
    }
}

const calcResult = () => {
    let blocks = stringToDisplay.split(' ');
    
    if (lastOperand !== '' && blocks.length > 1) {
        let operandA = blocks.shift();
        while (blocks.length > 1) {
            let operator = blocks.shift();
            let operandB = blocks.shift();
            operandA = evaluate(operandA, operator, operandB);
        }
        if (operandA == Infinity) {
            displayNumbers.innerHTML='Division by Zero Error';
            stringToDisplay = '0';
            lastOperand = '0';
        } else {
            stringToDisplay = operandA;
            lastOperand = operandA;
            displayNumbers.innerHTML=stringToDisplay;
        }
    }
}

const evaluate = (a, op, b) => {
    let result = ''
    switch(['+', '-', 'x', '/'].indexOf(op)) {
        case 0:
          result = Number(a) + Number(b);
          break;
        case 1:
          result = Number(a) - Number(b);
          break;
        case 2:
          result = Number(a) * Number(b);
          break;
        case 3:
          result = Number(a) / Number(b);
          break;
        default:
            result = 'error'
        }

    return (Math.round(result*10000000)/10000000).toString();
    
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