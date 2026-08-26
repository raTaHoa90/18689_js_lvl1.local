var resultError = false,
    form;

function isValidEmail(email){
    // \w = [a-zA-Z0-9] ..
    return /^([\w+-]+\.)*[\w+-]+\w@([\w-]+\.){1,3}[\w]{2,}$/.test(email);
}

function isValidDate(date){
    return /^((0[1-9]|[12][0-9])\.02|(0[1-9]|[12][0-9]|3[01])\.(0[13578]|1[02])|(0[1-9]|[12][0-9]|30)\.(04|06|09|11))\.\d{4}$/i.test(date);
}

function addError(textError){
    let elem = document.createElement('div');
    elem.textContent = textError;
    elem.onclick = function(){ this.remove(); };
    document.getElementById('errors').append(elem);
    resultError = true;
    setTimeout(_=>elem.remove(), 3000);
}

function init(){
    form = document.forms.mainForm;

    form.onsubmit = function(){
        resultError = false;
        if(!isValidEmail(form.email.value)){
            resultError = true;

            form.email.setCustomValidity('Неправильно введен Email-адрес');
            form.email.reportValidity();
        } else 
            form.email.setCustomValidity('');

        return !resultError;
    }
}

function validation(){
    resultError = false;
    
    // проверяем валидацию браузера
    for(let input of form.elements)
        if(!input.validity.valid){
            if(input.value == 0 && input.required)
                addError(input.name + ' ' + input.validationMessage);
            else
                addError(input.validationMessage);
        }

    if(!isValidEmail(form.email.value))
        addError('Неправильно введен Email-адрес');

    if(!resultError)
        form.submit();
}

/* input.validity
    .valid:           возвращает булевое значение, которое указывает, проходит ли элемент формы валидацию (true) или нет (false)
    .valueMissing:    возвращает true, если в элементе формы, который требует обязательного ввода, отсутствует значение
    .typeMismatch:    возвращает true, если введенное значение не соответствует типу элемента формы (например, в элемент <input type="email"> введен текст, которые не является адресом элементронной почты)
    .patternMismatch: возвращает true, если введенное значение не соответствует указанному шаблону
    .tooLong:         возвращает true, если введенное значение превышает максимально допустимый лимит
    .tooShort:        возвращает true, если введенное значение меньше минимально допустимого значения
    .rangeUnderflow:  возвращает true, если введенное значение меньше диапазона допустимых значений
    .rangeOverflow:   возвращает true, если введенное значение превышает диапазон допустимых значений
    .stepMismatch:    возвращает true, если введенное значение не соответствует значению атрибута step
    .badInput:        возвращает true, если введенное значение некорректно
    .customError:     возвращает true, если при вводе была сгенерирована кастомная ошибка
*/

/* FORM
    form.action
    form.method
    form.name
    form.elements
    form.length
    form.submit() - отправить форму принудительно
    form.reset()  - восстановить данные на дефолтные

    form.onsubmit - вызывается, перед отправкой данных на сервер.

    form.elementID
    form['elementID']
    form.elements.elementID
    form.elements['elementID']
*/

/* INPUT
    input.value
    input.checked  - выбран/невыбран
    input.disabled - активен/неактивен
    input.readOnly - только чтение / можно редактировать
    input.type
    input.focus() - устанавливает фокус
    input.blur() - убирает фокус

    input.defaultValue - значение которое было указано в value при парсинге страницы
    input.willValidate - проверяется ли валидация браузером

    input.onfocus    - при получении фокуса ввода
    input.onblur     - при потере фокуса ввода
    input.onchange   - при изменении поля
    input.oninput    - во время изменения поля
    input.onselect   - при выделения текста внутри поля
    input.onkeydown  - когда пользователь нажимает кнопку на клавиатуре
    input.onkeypress - когда пользователь нажал и отпустил кнопку на клавиатуре
    input.onkeyup    - когда пользователь отпустил кнопку на клавиатуре
*/

/* SELECT
    select.options – коллекция из подэлементов <option>
    select.selectedOptions - коллекция из подэлементов <option>, которые были выбраны
    select.value – значение выбранного в данный момент <option>
    select.selectedIndex – номер выбранного <option>
    select.type => 'select-one' | 'select-multiple'
    select.focus()
    select.blur()

    select.options[...options.length] = option; // добавить option в конец списка
    select.options[selectedIndex] = null; // удалить option
    
    select.add(option) - добавить элемент списка
    select.remove(selectedIndex) - удалить указанный элемент списка по его индексу
*/

/* OPTIONS
    option.selected - выбран (true) или нет (false)
    option.index - индекс внутри select
    option.value - значение которое отправит пользователь
    option.text  - значение который видит пользователь

    option = new Option(text, value, defaultSelected, selected);
*/

/* IMG
    var img = new Image(100, 200);
    img.onload = function(){
        img.width   // ширина
        img.height  // высота
        img.naturalWidth  // ширина из самого файла
        img.naturalHeight // высота из самого файла
    }
    img.alt = 'text'
    img.src = "picture.jpg";
    document.body.appendChild(img);
*/

/*
    alert('message') - выводит пользователю сообщение
    text = prompt('cation','default') - просит пользователя ввести значение, которое возвращает в JS, или NULL, если пользователь нажал "Отмена"
    boolValue = confirm('вопрос') - возвращает true, если пользователь нажал "ДА", и false, если нажал "НЕТ"
    document.querySelector('css-selector') - поиск элемента по CSS-селектору
    document.querySelectorAll('css-selector') - поиск элементов по CSS-селектору
*/