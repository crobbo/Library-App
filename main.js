// Array to store all books in
var bookArray = [];

const addBook = (title, author, pages, read ) => { 
  // Inner Html to display book to user
  var cardMarkUp =  `<div class="book-info">
  <h2 class="book-title">${title}</h2>
  <p class="book-author"><span class="info">${author}</span></p>
  <p class="book-pages">No. of pages: <span class="info">${pages}</span></p>
  <p class="book-read">Read: <span class="">${read ? '✅' : '❌'}</span></p>
  <button class="remove-btn" onclick="deleteBook(this.parentNode.parentNode.id)">Delete</button>
  </div>
  <img src="https://via.placeholder.com/300x400" alt="" class="book-img">`;

  const createCard = (book, boolean, id=null) => {
    var grid = document.querySelector('.book-list');
    var bookCard = document.createElement('div');
    bookCard.classList = 'book-card';
    if (boolean) {
      bookCard.id = id
    } else {
      bookCard.id = 'book' + bookArray.indexOf(book)
    }
    grid.appendChild(bookCard);
    bookCard.innerHTML = cardMarkUp;
  };

  return {title, author, pages, read, createCard, deleteBook }

  };

// Changes colour of add book button or cancel button colour
function changeBtnColour() {
  if (document.querySelector('.add-book-btn')) {
    var button = document.querySelector('.add-book-btn');
    button.classList = 'cancel-book-btn';
    button.innerText = 'Cancel';
  } else {
    var button = document.querySelector('.cancel-book-btn');
    button.classList = 'add-book-btn';
    button.innerText = '+ Add Book';
  }
  }

// Shows add book form when Add book button is clicked 
function showForm()  {
  var x = document.getElementById("add-book-div");
  x.style.display
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  changeBtnColour()
};

// Adds a new book to user's library
function formData() {
  var title = document.getElementById("title").value;
  var author = document.getElementById("author").value;
  var pages = document.getElementById("pages").value;
  document.getElementById("readYes").checked ? (read = true) : (read = false);  
  var book = addBook(title, author, pages, read);
  bookArray.push(book);
  book.createCard(book, false);
  saveBooks([title, author, pages, read], bookArray.indexOf(book))
};

// Deletes a book from user's library 
function deleteBook(id) {
  var bookId = id.split('book');
  var bookDiv = document.querySelector('#' + id)
  bookDiv.remove()
  bookArray.splice(bookId[0], 1)
  localStorage.removeItem(id)
};

// Save books to local storage
function saveBooks(bookArr, index) {
  var newString = (bookArr.join(','))
  localStorage.setItem('book' + index, newString)  
}

// Load books from local storage.
function loadBooks( ){
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
      let storageStr = localStorage.getItem(key);
      let array = storageStr.split(',');
      let restoredBook = addBook(array[0], array[1], array[2], array[3])
      bookArray.push(restoredBook)
      restoredBook.createCard(restoredBook, true, key)
    }
};

// Load any existing books from local storage
loadBooks();