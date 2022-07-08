const title = document.getElementById('title');
const author = document.getElementById('author');
const isbn = document.getElementById('isbn');
const submitBtn = document.querySelector('.btn'); 
const tableBody = document.getElementById('book-list');


class Book {
    constructor(name, author, isbn) {
        this.name = name;
        this.author = author;
        this.isbn = isbn; 
    }
}


loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getBooks);
    submitBtn.addEventListener('click', runEvent);
    tableBody.addEventListener('click', removeBook);
}

function getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    books.forEach(function(book) {
        const tableRow = document.createElement('tr'); 
        tableRow.className = 'book-row';
        tableBody.appendChild(tableRow); 

        const bookCol = document.createElement('td');
        bookCol.appendChild(document.createTextNode(book.name));
        tableRow.appendChild(bookCol);

        const authorCol = document.createElement('td');
        authorCol.appendChild(document.createTextNode(book.author));
        tableRow.appendChild(authorCol);
        
        const isbnCol = document.createElement('td');
        isbnCol.appendChild(document.createTextNode(book.isbn));
        tableRow.appendChild(isbnCol);

        const removeCol = document.createElement('td');
        const removeAnchor = document.createElement('a');
        removeAnchor.innerHTML = '<i class="fa fa-remove"></i>';
        removeCol.appendChild(removeAnchor);
        tableRow.appendChild(removeCol);

        
    });
}

function removeBook(e) {
    if(e.target.parentElement.parentElement.parentElement.classList.contains('book-row')) {
        e.target.parentElement.parentElement.parentElement.remove();
    }
}


function runEvent(e) {
    if(title.value === '' || author.value === '' || isbn.value === '') {
        const errorMsg = document.createElement('div');
        errorMsg.className = 'u-full-width .error';
        errorMsg.innerText = 'Please fill all fields!';
        errorMsg.style.background = 'red';
        errorMsg.style.color = 'white';
        errorMsg.style.padding = '5px';
        errorMsg.style.margin = '5px 0 15px 0';
        document.querySelector('.container').insertBefore(errorMsg, document.querySelector('h1'));
        setTimeout(function() {
            errorMsg.style.display = 'none';
        }, 3000);
    } else {
        console.log('Entered else');
        const book = new Book(title.value, author.value, isbn.value);
        const tableRow = document.createElement('tr'); 
        tableRow.className = 'book-row';
        tableBody.appendChild(tableRow); 

        const bookCol = document.createElement('td');
        bookCol.appendChild(document.createTextNode(book.name));
        tableRow.appendChild(bookCol);

        const authorCol = document.createElement('td');
        authorCol.appendChild(document.createTextNode(book.author));
        tableRow.appendChild(authorCol);
        
        const isbnCol = document.createElement('td');
        isbnCol.appendChild(document.createTextNode(book.isbn));
        tableRow.appendChild(isbnCol);

        const removeCol = document.createElement('td');
        const removeAnchor = document.createElement('a');
        removeAnchor.innerHTML = '<i class="fa fa-remove"></i>';
        removeCol.appendChild(removeAnchor);
        tableRow.appendChild(removeCol);

        title.value = '';
        author.value = '';
        isbn.value = '';

        const successMsg = document.createElement('div');
        successMsg.className = 'u-full-width .error';
        successMsg.innerText = 'Book added successfully!';
        successMsg.style.background = 'green';
        successMsg.style.color = 'white';
        successMsg.style.padding = '5px';
        successMsg.style.margin = '5px 0 15px 0';
        document.querySelector('.container').insertBefore(successMsg, document.querySelector('h1'));
        setTimeout(function() {
            successMsg.style.display = 'none';
        }, 3000);

        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } 
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    e.preventDefault();
}
