
function* idMaker(){
    var index = 0;
    while(true)
        yield index++;
}

class Book {
    bookName;
    desc;
    numBookcase;
    numShelf;
    author;

    static head(){
        return  '<th>Название</th><th>Автор</th><th>Описание</th><th>Номер шкафа</th><th>Номер полки</th><th>Действия</th>';
    }

    constructor(...args){
        if(typeof(args[0]) == 'object')
            this.replace(...Object.values(args[0]));
        else
            this.replace(...args);
    }

    replace(bookName = '', desc = '', numBookcase = '1', numShelf = '1', author = ''){
        this.bookName = bookName;
        this.desc = desc;
        this.numShelf = numShelf;
        this.numBookcase = numBookcase;
        this.author = author;
    }

    draw(varName){
        return `<tr>
            <td>${this.bookName}</td>
            <td>${this.author}</td>
            <td>${this.desc}</td>
            <td>${this.numBookcase}</td>
            <td>${this.numShelf}</td>
            <td>
                <input type=button value="Редактировать" onclick="${varName}.edit('${this.bookName}')">
                <input type=button value="Удалить" onclick="${varName}.remove('${this.bookName}');">
            </td>
            </td></tr>`;
    }
}


class Library {

    static count = 0;
    static #generator;

    #NAME;
    #length = 0;
    #varName;
    #view;
    #idView;
    #keySave;
    #id;
    #books = {};

    constructor(name, varName, viewID, data = {}){
        this.#NAME = name;
        this.#length = 0;
        this.#varName = varName;
        this.#view = document.getElementById(viewID);
        this.#idView = viewID;

        if(!Library.#generator)
            this.constructor.#generator = idMaker();
        this.#id = this.constructor.#generator.next().value;

        Object.assign(this, data);
        //Library.count++;
        this.constructor.count++;
    }

    init(){
        this.#view = document.getElementById(this.#idView);
    }

    replace(oldNameBook, nameBook, ...args){
        if(this.#books[oldNameBook] === undefined)
            this.add(nameBook, ...args);
        else if(oldNameBook == nameBook)
            this.#books[nameBook].replace(nameBook, ...args);
        else {
            let obj = this.#books[oldNameBook];
            this.del(oldNameBook);
            obj.replace(nameBook, ...args);
            this.add(obj);
        }
    }

    add(...args){
        let incLengthIFnewBook = nameBook => {
            if(this.#books[nameBook] === undefined)
            this.#length++;
        }
        
        if(args[0] instanceof Book){
            incLengthIFnewBook(args[0].nameBook);
            this.#books[args[0].nameBook] = args[0];
            return;
        }

        incLengthIFnewBook(args[0])
        this.#books[args[0]] = new Book(args);
    }

    del(nameBook){
        if(this.#books[nameBook] !== undefined){
            delete this.#books[nameBook];
            this.#length--;
        }
    };
    
    indexToKey(num){
        return Object.keys(this.#books)[num];
    } 

    getTable(){
        let page = ['<table border=1 style="margin-top:20px"><caption>' + this.#NAME + '</caption><tr>' + Book.head() + '</tr>'];
        for(let bookName in this.#books)
            page.push(this.#books[bookName].draw(this.#varName));
        page.push('</table>');
        return page.join('');
    }

    edit(bookName) {
        if(this.onStartEdit)
            this.onStartEdit(this.#books[bookName], bookName);
    }

    save(keyName) {
        if(!this.#keySave)
            this.#keySave = keyName;
        localStorage[this.#keySave] = JSON.stringify(this.#books);
    }

    load(keyName) {
        if(!this.#keySave)
            this.#keySave = keyName;

        if(localStorage[this.#keySave]){
            let parseSave = JSON.parse(localStorage[this.#keySave]);
            for(let bookName in parseSave)
                //if(parseSave[bookName].bookName === undefined)
                    //parseSave[bookName] = {bookName, ...parseSave[bookName]}
                this.#books[bookName] = new Book(parseSave[bookName]);
        }
    }

    draw(){
        this.#view.innerHTML = this.getTable();
    }

    remove(bookName){
        this.del(bookName);
        this.draw();
        this.save();
    }
}

//Library.prototype.test = 123
Library.fabricMethod = function(){};
Library.count = 0;

String.prototype.splitParams = function(){
    let paramsStr = this.split('&'),
        result = {};

    for(let paramStr of paramsStr){
        let param = paramStr.split('=');
        result[param[0]] = param[1];
    }

    return result;
}


