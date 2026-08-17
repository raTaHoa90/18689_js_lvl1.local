function Library(name, varName, viewID){
    this.NAME = name;
    this.length = 0;
    this.varName = varName;
    this.view = document.getElementById(viewID);

    this.init = ()=> this.view = document.getElementById(viewID);

    this.add = function(nameBook, desc, numBookcase, numShelf){
        if(this[nameBook] === undefined)
            this.length++;
        this[nameBook] = { desc, numBookcase, numShelf };
    };
    this.del = function(nameBook){
        if(this[nameBook] !== undefined){
            delete this[nameBook];
            this.length--;
        }
        
    };
    this.indexToKey = num => Object.keys(this)[num];

    this.getTable = function(){
        let page = ['<table border=1 style="margin-top:20px"><caption>' + this.NAME + '</caption><tr><th>Название</th><th>Описание</th><th>Номер шкафа</th><th>Номер полки</th><th>Действия</th></tr>'];
        for(let bookName in this)
            page.push(`<tr>
                <td>${bookName}</td>
                <td>${this[bookName].desc}</td>
                <td>${this[bookName].numBookcase}</td>
                <td>${this[bookName].numShelf}</td>
                <td><input type=button value="Удалить" onclick="${this.varName}.remove('${bookName}');"></td>
                </td></tr>`
            );
        page.push('</table>');
        return page.join('');
    }

    this.save = keyName => {
        if(!this.keySave){
            this.keySave = keyName;
            Object.defineProperty(this, 'keySave', {enumerable: false});
        }
        localStorage[this.keySave] = JSON.stringify(this);
    }
    this.load = keyName => {
        if(!this.keySave){
            this.keySave = keyName;
            Object.defineProperty(this, 'keySave', {enumerable: false});
        }
        if(localStorage[this.keySave])
            Object.assign(this, JSON.parse(localStorage[keyName]));
    }

    this.draw = function(){
        this.view.innerHTML = this.getTable();
    }

    this.remove = function(bookName){
        this.del(bookName);
        this.draw();
        this.save();
    }

    let configField = {enumerable: false};
    Object.defineProperties(this, {
        length: configField,
        varName: configField,
        add: configField,
        del: configField,
        indexToKey: configField,
        getTable: configField,
        save: configField,
        load: configField,
        draw: configField,
        init: configField,
        view: configField,
        remove: configField,
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

    Library.count++;
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