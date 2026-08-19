
function Rand(min, max){
    if( max == undefined ){
        max = min;
        min = 0;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class FirstClass {

    static num;
    static #count = 0;
    static #listObject = [];

    static allSpeak(){
        for(let obj of this.#listObject)
            console.log(obj.speak());
    }

    name = 'NoName';
    #i = 0;
    #num;
    num;

    constructor(name){
        this.name = name;
        this.#num = FirstClass.#count; 
        FirstClass.#count++;
        FirstClass.#listObject.push(this);
    }

    getName() {
        return '#' + this.#num + ': ' + this.name;
    }

    speak(){
        this.#i++;
        return this.getName() + ' что-то сказал ' + this.#i;
    }

    toString(){
        return this.getName();
    }

    valueOf(){
        return this.#num;
    }
}

var firstObj = new FirstClass('Джон');
console.log(firstObj.speak());

class SecondClass extends FirstClass {

    static #union;
    static #init(){
        this.#union = 123;
    }

    static {
        this.#init();
    }

    age;
    constructor(name, age){
        super(name);
        this.age = age;
    }

    #privateMethod(testParam){
        return testParam;
    }

    get temp(){
        SecondClass.#union = this.value;
        return this.#privateMethod(123);
    }

    set temp(value){
        this.#hiddenVal = value;
    }

    get #hiddenVal() {
        return this.value;
    }

    set #hiddenVal(value){
        this.value = value;
    }

    speak(){
        return super.speak() + '!!! (' + this.age + ')';
    }

    look(){
        return this.getName() + ' смотрит';
    }

    valueOf(){
        return this.age;
    }

    //['123' + 'test'](){ }

    *[Symbol.iterator](){
        let data = {aaa:123, bbb: 321};
        for(let key in data)
            yield [key, data[key]];
    }
}

var secondObj = new SecondClass('Фома', 18);
console.log(secondObj.speak());


var ar = [firstObj, secondObj];
for(let i = 10; i > 0; i--)
    ar.push( Math.random() < 0.33
        ? new FirstClass('Name' + Rand(1,9999))
        : new SecondClass('Name' + Rand(1,9999), Rand(10, 60))
    );

console.log(ar);

//===================================
//for(let obj of ar)
    //if(obj.speak)
    //console.log(obj.speak());
FirstClass.allSpeak();

ar[0].look = ()=> 'TEST';
for(let obj of ar)
    if(obj instanceof SecondClass)
    //if(obj.look && typeof(obj.look) == 'function')
        console.log(obj.look());

for(let param of secondObj)
    console.log(param);