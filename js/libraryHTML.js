function testError(){
    try {
        throw 'Тут ошибка!'; // создаем собственную ошибку
        throw new TypeError('saa');
    } finally {
        console.log('Все равно выводится');
    }
}


try {
    testError();
}catch(error){
    console.log(error);
}

let a;
try{
    console.log(a.b.d); // происходит ошибка

}catch(error){// ловим оштбку, и обрабатываем ее

    // проверяем ошибку на определенные типы ошибок
    if(error instanceof TypeError) 
        console.log('Ошибка типа');
    else if(error instanceof ReferenceError)
        console.log('Отсутствует переменная');
    console.log(error.message);

}finally{
    // выполняем что-то вне зависимости от того есть ошибка или нет
    console.log('finally');
}


var library = new Library("Библиотека книг", "library", 'viewTable');

library.onStartEdit = function(book, bookName){
    document.getElementById('nameBook').value = bookName;
    document.getElementById('author').value = book.author;
    document.getElementById('bookDesc').value = book.desc;
    document.getElementById('numBookcase').value = book.numBookcase;
    document.getElementById('numShelf').value = book.numShelf;
    document.getElementById('updateBook').value = bookName;

    document.getElementById('editBookInfo').showModal();
};

function loadPage(){
    library.init();
    library.load('library');
    library.draw();
    //document.getElementById('viewTable').innerHTML = library.getTable();
}

function ApplySaveBook(){
    let nameBook = document.getElementById('nameBook'),
        author = document.getElementById('author'),
        bookDesc = document.getElementById('bookDesc'),
        numBookcase = document.getElementById('numBookcase'),
        numShelf = document.getElementById('numShelf'),
        oldNameBook = document.getElementById('updateBook');
    
    if(oldNameBook.value === '')
        library.add(
            nameBook.value, 
            bookDesc.value, 
            numBookcase.value, 
            numShelf.value,
            author.value
        );
    else
        library.replace(
            oldNameBook.value,
            nameBook.value, 
            bookDesc.value, 
            numBookcase.value, 
            numShelf.value,
            author.value
        );

    library.draw();
    library.save();

    document.getElementById('editBookInfo').close();
}

function openNewBook(){
    document.getElementById('editBookInfo').showModal();
    document.getElementById('nameBook').value = '';
    document.getElementById('author').value = '';
    document.getElementById('bookDesc').value = '';
    document.getElementById('numBookcase').value = '';
    document.getElementById('numShelf').value = '';
    document.getElementById('updateBook').value = '';
}

function CloseDialog(){
    document.getElementById('editBookInfo').close();
}