const themeSelector = document.querySelector('#themeSelector');
const btns = document.querySelectorAll('.btn');
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

selectTheme();

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
        case '*':
            return multiply(operand1, operand2);
    }
}

function showInputsOnDisplay(value){
    if(calculatorDisplay.textContent === '0'){
        calculatorDisplay.textContent = '';
        calculatorDisplay.textContent += value;
        flag = false;
    }
    else{
        if(flag){
            calculatorDisplay.textContent = '';
            calculatorDisplay.textContent += value;
            flag = false;
        }
        else{
            calculatorDisplay.textContent += value;
        }
    }
}

function performOperation_showResult(value){
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
    operator = value;
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

btns.forEach(btn => {
    btn.addEventListener('click', function(e){
        let onClickValue = e.target.value;
        if(onClickValue != '+' && onClickValue != '-' && onClickValue != '÷' 
        && onClickValue != '*' && onClickValue != '.' && onClickValue != 'del'
        && onClickValue != '=' && onClickValue != 'reset'){
            showInputsOnDisplay(onClickValue);
        }
        if(onClickValue === '+' || onClickValue === '-'
        || onClickValue === '÷' || onClickValue === '*'){
            performOperation_showResult(onClickValue);
        }
        if(onClickValue === '=' && isfirstInput){
            performOperation_showResult_usingEqualBtn();
        }
        if(onClickValue === '.'){
            if(!calculatorDisplay.textContent.includes('.') && !flag){
                calculatorDisplay.textContent += '.';
            }
        }
        if(onClickValue === 'del'){
            deleteChar();
        }
        if(onClickValue === 'reset'){
            resetDisplay();
        }
    });
});

document.addEventListener('keydown', function(e){
    let onKeypressValue = e.key;
    if(Number.isInteger(parseInt(onKeypressValue))){
        showInputsOnDisplay(onKeypressValue);
    }
    else if(onKeypressValue === '.'){
        if(!calculatorDisplay.textContent.includes('.') && !flag){
            calculatorDisplay.textContent += '.';
        }
    }
    else if(onKeypressValue === '+' || onKeypressValue === '-' ||
    onKeypressValue === '/' || onKeypressValue === '*'){
        if(onKeypressValue === '/') onKeypressValue = '÷';
        performOperation_showResult(onKeypressValue);
    }
    else if(onKeypressValue === 'Backspace'){
        deleteChar();
    }
    else if((onKeypressValue === '=' || onKeypressValue === 'Enter') && isfirstInput){
        performOperation_showResult_usingEqualBtn();
    }
    else if(onKeypressValue === 'Escape'){
        resetDisplay();
    }
});