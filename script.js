const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

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
        