const themeSelector = document.querySelector('#themeSelector');
const btnValue = document.querySelectorAll('#btnValue');
const prevousInputs = document.querySelector('.previous-inputs');
const calculatorDisplay = document.querySelector('.current-display');
let themeValue = 1;
let operand1 = '';
let operand2 = '';
let operator = '';
let result = '';
let flag = false;
let isfirstInput = false;

function previouslySelectedTheme(){
    themeValue = localStorage.getItem('selectedTheme');
    if(themeValue === '1'){
        document.body.removeAttribute('class');
        document.body.setAttribute('class', 'theme-1');
        themeSelector.value = localStorage.getItem('toggleValue');
    }
    else if(themeValue === '2'){
        document.body.removeAttribute('class');
        document.body.setAttribute('class', 'theme-2');
        themeSelector.value = localStorage.getItem('toggleValue');
    }
    else if(themeValue === '3'){
        document.body.removeAttribute('class');
        document.body.setAttribute('class', 'theme-3');
        themeSelector.value = localStorage.getItem('toggleValue');
    }
}

function selectTheme(){
    previouslySelectedTheme();
    themeSelector.addEventListener('input',function(){
        themeValue = themeSelector.value;
        if(themeValue === '1'){
            document.body.removeAttribute('class');
            document.body.setAttribute('class', 'theme-1');
        }
        else if(themeValue === '2'){
            document.body.removeAttribute('class');
            document.body.setAttribute('class', 'theme-2');
        }
        else if(themeValue === '3'){
            document.body.removeAttribute('class');
            document.body.setAttribute('class', 'theme-3');
        }
        if (typeof(Storage) !== 'undefined') {
            localStorage.setItem('selectedTheme', themeValue);
            localStorage.setItem('toggleValue', themeValue);
        }else {
            console.log('Sorry! No Web Storage support');
        }
    });
}

prevousInputs.addEventListener("wheel", function(e) {
    e.preventDefault();
    prevousInputs.scrollLeft += e.deltaY;
});

calculatorDisplay.addEventListener("wheel", function(e) {
    e.preventDefault();
    calculatorDisplay.scrollLeft += e.deltaY;
});

function add(operand1, operand2){
    return parseFloat(operand1) + parseFloat(operand2);
}

function subtract(operand1, operand2){
    return parseFloat(operand1) - parseFloat(operand2);
}

function multiply(operand1, operand2){
    return parseFloat(operand1) * parseFloat(operand2);
}

function division(operand1, operand2){
    return parseFloat(operand1) / parseFloat(operand2);
}

function operate(operator, operand1, operand2){
    switch(operator){
        case '+':
            return add(operand1, operand2);
        case '-':
            return subtract(operand1, operand2);
        case '÷':
            return division(operand1, operand2);
        case 'x':
            return multiply(operand1, operand2);
    }
}

function showInputsOnDisplay(e){
    if(calculatorDisplay.textContent === '0'){
        calculatorDisplay.textContent = '';
        calculatorDisplay.textContent += e.target.value;
        flag = false;
    }
    else{
        if(flag){
            calculatorDisplay.textContent = '';
            calculatorDisplay.textContent += e.target.value;
            flag = false;
        }
        else{
            calculatorDisplay.textContent += e.target.value;
        }
    }
}

function performOperation_showResult(e){
    if(!isfirstInput){
        operand1 = calculatorDisplay.textContent;
        isfirstInput = true;
    }
    else if(!flag){
        operand2 = calculatorDisplay.textContent;
        result = operate(operator, operand1, operand2);
        if((result.toString()).includes('.')){
            result = parseFloat(parseFloat(result).toFixed(3));
        }
        calculatorDisplay.textContent = result;
        operand1 = result;
    }
    flag = true;
    operator = e.target.value;
    prevousInputs.textContent = operand1 + ' ' + operator;
}

function performOperation_showResult_usingEqualBtn(){
    if(!flag){
        operand1 = (prevousInputs.textContent.split(' '))[0];
        operand2 = calculatorDisplay.textContent;
        result = operate(operator, operand1, operand2);
        if((result.toString()).includes('.')){
            result = parseFloat(parseFloat(result).toFixed(3));
        }
        calculatorDisplay.textContent = result;
        prevousInputs.textContent = operand1 + ' ' + operator + ' ' + operand2 + ' =';
        operand1 = result;
    }
    flag = true;
}

function deleteChar(){
    if(calculatorDisplay.textContent != '0'){
        calculatorDisplay.textContent = calculatorDisplay.textContent.slice(0, -1);
    }
    if(calculatorDisplay.textContent.length === 0){
        calculatorDisplay.textContent = '0';
    }
}


function resetDisplay(){
    calculatorDisplay.textContent = '0';
    prevousInputs.textContent = '';
    operand1 = '';
    operand2 = '';
    operator = '';
    result = '';
    flag = false;
    isfirstInput = false;
}

btnValue.forEach(btn => {
    btn.addEventListener('click', function(e){
        if(e.target.value != '+' && e.target.value != '-' && e.target.value != '÷' 
        && e.target.value != 'x' && e.target.value != '.' && e.target.value != 'del'
        && e.target.value != '=' && e.target.value != 'reset'){
            showInputsOnDisplay(e);
        }
        if(e.target.value === '+' || e.target.value === '-'
        || e.target.value === '÷' || e.target.value === 'x'){
            performOperation_showResult(e);
        }
        if(e.target.value === '=' && isfirstInput){
            performOperation_showResult_usingEqualBtn();
        }
        if(e.target.value === '.'){
            if(!calculatorDisplay.textContent.includes('.') && !flag){
                calculatorDisplay.textContent += '.';
            }
        }
        if(e.target.value === 'del'){
            deleteChar();
        }
        if(e.target.value === 'reset'){
            resetDisplay();
        }
    });
});

selectTheme();