// get UI elements

let bookForm = document.querySelector('#book-form');

let booklist = document.querySelector("#book-list")



// Book class

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    };
    

}

// UI class


class UI{
   
    
  static  addbook(book) {
        let list = document.querySelector("#book-list");
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title} </td>
        <td>${book.author} </td>
        <td>${book.isbn} </td>
        <td><a href = "#" class = "delete">x</a></td>`
        localStorage
        list.appendChild(row)
        
     

    }
   static clearForm() {
        document.querySelector("#title").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#isbn").value = '';
    }

   static showAlert(message, className) {
        let div = document.createElement('div');
        div.className = `alter ${className}`;
        div.appendChild(document.createTextNode(message));
        div.style.textAlign = "center"
        let container = document.querySelector('.container');
        let form = document.querySelector("#book-form");
        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector(".alter").remove();
        },3000)
        
    }
   static deleteFromBook(target) {
        if (target.hasAttribute("href")) {
            target.parentElement.parentElement.remove()
             Store.removeBookUsingIsbn(target.parentElement.previousElementSibling.textContent.trim());
            UI.showAlert("Book is deleted!", "success");
        }
     
    }
    

}


class Store{
    static getbook() {
        let books;
        if (localStorage.getItem("book") === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('book'));
        }
        return books;
    }

   static addBookToLocalStorage(book) {
        let books;
        books = Store.getbook();
        books.push(book);
        localStorage.setItem('book', JSON.stringify(books))
        
    }
    static displayBooks() {
        let books = Store.getbook();

        books.forEach(book => {
            UI.addbook(book);
        });

        
    }
    
    static removeBookUsingIsbn(isbn) {
        console.log("ok");
        let books = Store.getbook();
        books.forEach((book, index)=>{
            if (book.isbn === isbn) {
                books.splice(index, 1);

            }
        })
       localStorage.setItem("book", JSON.stringify(books))
    }
}
    



// add evenlisener

bookForm.addEventListener("submit", newbook);
booklist.addEventListener("click", removebook);
document.addEventListener("DOMContentLoaded",Store.displayBooks())

function newbook(e) {
  
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let isbn = document.querySelector("#isbn").value;
    let book = new Book(title, author, isbn);

    if (title === '' || author === '' || isbn === '') {
       UI.showAlert("please fill fields", "error");
    }
    else {
        UI.addbook(book);
        UI.showAlert("added new book sucessfully", "success");
        Store.addBookToLocalStorage(book);
        UI.clearForm();
    }

    e.preventDefault();
}

function removebook(e) {
   
    UI.deleteFromBook(e.target);

    e.preventDefault();
}