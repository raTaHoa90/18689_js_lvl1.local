var backValue = 0, 
    operation = '',
    hasDot = false;


/*
    'test'.indexOf('s') => 2
    'test'.indexOf('y') => -1
*/

function addDigit( btn ) {
    let display = document.getElementById('display'); // найти Input id='display'

    if(display.value === '0' || operation == '='){
        display.value = btn.value;
        if(operation == '=')
            operation = '';
    } else {
        display.value += btn.value;
    }
}

function setDot(){
    if(hasDot)
        return;

    let display = document.getElementById('display');

    hasDot = true;
    if(operation == '='){
        display.value = '0.';
        operation = '';
    } else
        display.value += '.';
}

function backSpace(){
    let display = document.getElementById('display'),
        len = display.value.length;
    
    if(display.value[len - 1] == '.')
        hasDot = false;

    display.value = display.value.substr(0, len - 1); // 1234 => 123

    if(display.value == '')
        display.value = 0;
}

function clearDisplay(){
    document.getElementById('display').value = 0;
}

function calcOperation(value){
    /*if(operation == '-'){

    }else if(operation == '+'){

    }else if(operation == '*'){

    }else {
        // default
    } */

    switch(operation){
        case '-':
            value = backValue - value;
            break;
        
        case '+':
            value = backValue + value;
            break;

        case '*':
            value = backValue * value;
            break;
        
        case '/':
            value = backValue / value;
            break;

        default:
            // действия по умолчанию, если нет указанных значений выше
            return value;
    }

    return value;
}

function setOperation(oper){
    let display = document.getElementById('display'),
        value = 0;

    value = calcOperation(+display.value); // +'123' => 123

    operation = oper;
    backValue = value;
    display.value = 0;
    hasDot = false;
}

function enterCalc() {
    let display = document.getElementById('display'),
        value = 0;

    value = calcOperation(+display.value);

    operation = '=';
    backValue = 0;
    display.value = value;
    hasDot = false;
}