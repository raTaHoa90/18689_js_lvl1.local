let obj = {
        field1: 123,
        size: 400,
        isAction: true,
        delF: 'на удаление'
    },
    obj2 = {
        size: 200,
        isUser: false,
        name: 'test'
    }

console.log(obj.size);
obj.size = 500;

console.log(obj['size']);
obj['size'] = 132;
//obj[1] = 123
//obj['1'] = 123

obj.newField = 123;

console.log('=======');
for(let field in obj)
    console.log(field + ' = "' + obj[field] + '"');

obj.delF = undefined;
obj.newFld = 321;

console.log(Object.keys(obj));
console.log(obj);

delete obj.delF;
//delete obj['delF'];
console.log(obj);

console.log(Object.values(obj));

Object.assign(obj, obj2);
console.log(obj);

//======================================================
let library = {
    length: 0,
    add: function(nameBook, desc){
        if(this[nameBook] === undefined)
            this.length++;
        this[nameBook] = desc;
    },
    del: function(nameBook){
        if(this[nameBook] !== undefined){
            delete this[nameBook];
            this.length--;
        }
    },
    search: function(num){
        return Object.keys(this)[num];
    },

    get name(){
        return 'Библиотека книг';
    },

    set name(value){
        this.add(value,'!!!');
    }
}

Object.defineProperty(library, 'length', {
    //configurable: false, // если мы хотим зафиксировать текущий ключ и имя без возмножности его изменения, в том числе удаления ключа, то указываем это поле как FALSE
    enumerable: false, // True = свойство можно получить в FOR или Object.keys
    //writable: false, // False для того, что бы зафиксировать значение поля, и не давать его менять
    //get: function(){return value}, // делаем из имени геттер
    //set: funciton(value){}         // делаем из имени сеттер
    //value: 0                       // значение по умолчанию для геттера/сеттера
});

Object.defineProperty(library, 'descript',{
    enumerable: false,
    get: function(){
        return 'count:' + this.length;
    },
    set: function(value){
        this.add(value, '???');
    }
});

const configField = {enumerable: false};
Object.defineProperties(library, {
    add: configField,
    del: configField,
    search: configField,
    name: configField
});

library.add('Собачье сердце', 'Человек получает собачье серце, и постепенно начинает вести себя как собака');
library.add('Вешневый сад', 'У владелицы вешневого сада пытаются купить участок для перестройки, а она сопротивляется');
library.add('Dune', 'Происходит борьба дома на другой пустынной планете, за редкую пряность которая имеет высокую ценность');

library.descript = 'Test';
library.name = 'SET';

let page = ['<table border=1><tr><th>Название</th><th>Описание</th></tr>'];
for(let bookName in library)
    page.push('<tr><td>' + bookName + '</td><td>' + library[bookName] + '</td></tr>');
page.push('</table>');

document.writeln(page.join(''));
document.writeln(library.descript + '; ' + library.name);
// document.writeln('всего книг: ' + library.length);

console.log('=======');
console.log(Object.keys(library));
console.log(Object.values(library));
console.log(library);
console.log(Object.getOwnPropertyDescriptors(library)); // получить все поля и их настройки

const str = JSON.stringify(library); // obj => string
console.log(str);

const keys = Object.keys(library);
for(let key of keys)
    library.del(key);
console.log(library);

Object.assign(library, JSON.parse(str));
console.log(library);

// =======================================================================

function Library(name, data){
    var privateVar = 0;
    this.NAME = name;
    this.length = 0;

    this.add = function(nameBook, desc){
        if(this[nameBook] === undefined)
            this.length++;
        this[nameBook] = desc;
    };
    this.del = function(nameBook){
        if(this[nameBook] !== undefined){
            delete this[nameBook];
            this.length--;
        }
    };

    this.indexToKey = num => Object.keys(this)[num];

    this.getTable = function(){
        let page = ['<table border=1 style="margin-top:20px"><caption>' + this.NAME + '</caption><tr><th>Название</th><th>Описание</th></tr>'];
        for(let bookName in this)
            page.push('<tr><td>' + bookName + '</td><td>' + this[bookName] + '</td></tr>');
        page.push('</table>');
        return page.join('');

        /*let page = '<table border=1 style="margin-top:20px"><caption>' + this.NAME + '</caption><tr><th>Название</th><th>Описание</th></tr>';
        for(let bookName in this)
            page += '<tr><td>' + bookName + '</td><td>' + this[bookName] + '</td></tr>';
        page += '</table>';
        return page;*/
    }

    this.save = keyName => localStorage[keyName] = JSON.stringify(this);
    this.load = keyName => {
        if(localStorage[keyName])
            Object.assign(this, JSON.parse(localStorage[keyName]));
    }

    let configField = {enumerable: false};
    Object.defineProperties(this, {
        length: configField,
        add: configField,
        del: configField,
        indexToKey: configField,
        getTable: configField,
        save: configField,
        load: configField,
        NAME: {
            writable: false,
            enumerable: false
        },
        descript: {
            enumerable: false,
            get: () => 'count:' + this.length,
            set: value => this.add(value, '???')
        },
        name: {
            enumerable: false,
            get: () => this.NAME,
            set: value => this.add(value, '!!!')
        }
    });

    if(data)
        Object.assign(this, data);
}

let lib2 = new Library('Шкаф 2');
lib2.add('Сам себе властелин', 'Книга про попаданца, которого затягивают в иной мир, потому что он оказался единственным в роду наследником, темного Поместья, и теперь ему необходимо вернуть в него новую жизнь');
lib2.add('Играет чемпион', 'Человек попадает случайно в будущее, и единственное что он умеет это играть в игры, поэтому не долго думая он записывается на чемпионат в одну игре, и незная правил начинает играть по своему');

let lib3 = new Library('Шкаф 3');
lib3.add('Робинзон Круз', 'Гнига про человека, который послллле кароблекрушения попадает на необитаемый остров и пытается там выжить');
lib3.add('Трудно быть богом', 'Действие происходит на далекой планете в далеком будующем, человек из разветой цивилизации, наблюдает за развитием людей из средневековья, не имея возможности поделиться знаниями');

document.writeln(lib2.getTable());
document.writeln(lib3.getTable());

let lib4 = new Library('Шкаф 4', JSON.parse(str));
document.writeln(lib4.getTable());

/*
localStorage.clear(); // очистить все хранилище
localStorage['lib2'] = JSON.stringify(lib2);
Object.assign(lib2, JSON.parse(localStorage['lib2']));
localStorage.removeItem('lib2');
if(!localStorage.lib3)
    console.log('Нет сохранения lib3');
*/

Library.prototype.keys = function(){ return Object.keys(this); };

function Library2(name, data){
    this.NAME = name;
    this.length = 0;
    Library.call(this, name, data);
    this.test = function(){
        alert('TEST');
    }
}

Library2.prototype = Object.create(Library.prototype);
Library2.prototype.costructor = Library2;

let lib5 = new Library2('СуперШкаф', lib3);
console.log(lib5);