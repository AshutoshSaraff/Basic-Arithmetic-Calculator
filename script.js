const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
const darkModeToggle = document.getElementById('darkModeToggle');
let isDarkMode = false;

//Adding Script for History Button 
const historyBtn = document.getElementById('historyBtn');
let history = [];

// For Toggle Dark Mode
darkModeToggle.addEventListener('click', () =>{
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');

    // For Changing icon 
    darkModeToggle.innerHTML = `<img src="${isDarkMode ? 'Images/lightmode.png' : 'Images/darkmode.png'}" alt="Mode Icon">`;
});

let currentInput = '';
let operator = null;
let firstOperand = null;

function handleButtonClick(buttonValue) {
    if (!isNaN(buttonValue) || buttonValue === '.') {
        currentInput += buttonValue;
        display.textContent = currentInput;
    } else if (buttonValue === 'C') {
        currentInput = '';
        operator = null;
        firstOperand = null;
        display.textContent = '';
    } else if (buttonValue === '=') {
        if (operator && firstOperand !== null) {
            const secondOperand = parseFloat(currentInput);
            let result;

            switch (operator) {
                case '+':
                    result = firstOperand + secondOperand;
                    break;
                case '-':
                    result = firstOperand - secondOperand;
                    break;
                case '*':
                    result = firstOperand * secondOperand;
                    break;
                case '/':
                    result = firstOperand / secondOperand;
                    break;
            }

            // Added for History Button
            history.unshift(`${firstOperand} ${operator} ${secondOperand} = ${result}`);
            if (history.length > 2) history.pop();

            display.textContent = result;
            currentInput = result.toString();
            operator = null;
            firstOperand = null;
            
        }} else if (buttonValue === '←') {
            currentInput = currentInput.slice(0, -1);
            display.textContent = currentInput;
        } else {
            if (firstOperand === null) {
                firstOperand = parseFloat(currentInput);
            } else {
                const secondOperand = parseFloat(currentInput);
                let result;
                switch (operator) {
                    case '+':
                        result = firstOperand + secondOperand;
                        break;
                    case '-':
                        result = firstOperand - secondOperand;
                        break;
                    case '*':
                        result = firstOperand * secondOperand;
                        break;
                    case '/':
                        result = firstOperand / secondOperand;
                        break;
                }
                firstOperand = result;
            }
            operator = buttonValue;
            currentInput = '';
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            handleButtonClick(button.textContent);
        });
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key;

        if (!isNaN(key) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
            event.preventDefault();
            handleButtonClick(key);
        } else if (key === '=' || key === 'Enter') {
            event.preventDefault();
            handleButtonClick('=');
        } else if (key === 'c' || key === 'C') {
            event.preventDefault();
            handleButtonClick('C');
        } else if (key === 'Backspace') {
            event.preventDefault();
            handleButtonClick('←');
        }
    });
//Adding Event Listeners for History Button

historyBtn.addEventListener('click', () => {
    if (history.length > 0) {
        display.textContent = history.join(' | ');
        display.style.fontSize = "1.1em";
    }
});       