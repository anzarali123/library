const searchBook = document.querySelector(".search-bar");
const booksList = document.querySelector(".book-list-container");
const addBookInput = document.querySelector(".add-book-input");
const deleteBtn = document.querySelectorAll(".delete-btn");
const addBookBtn = document.querySelector(".add-book-btn");
const formData = document.querySelector(".add-book");

let books = JSON.parse(localStorage.getItem("books")) || [];

formData.addEventListener("submit", (e) => {
  e.preventDefault();
  if (addBookInput.value) {
    const book = addBookInput.value;
    addBookInput.value = "";
    storeBook(book);
  } else return;
});

searchBook.addEventListener("input", (e) => {
  const search = e.target.value.toLowerCase();
  Array.from(booksList.children).forEach((element) => {
    if (!element.firstElementChild.textContent.toLowerCase().includes(search)) {
      element.style.display = "none";
    } else element.style.display = "flex";
  });
});

function storeBook(book) {
  const obj = { name: book, id: books.length + 1 };
  books.push(obj);
  setLocalStorage();
  updateUI(obj);
}

function setLocalStorage() {
  localStorage.setItem("books", JSON.stringify(books));
}

function updateUI(obj) {
  const list = document.createElement("li");
  list.className = "book-list";
  list.id = obj.id;
  list.innerHTML = `<p>${obj.name}</p>
   <button class="delete-btn">delete</button>
  `;
  list.lastElementChild.addEventListener("click", (e) => {
    deleteBook(list.id);
  });
  booksList.appendChild(list);
}

function deleteBook(id) {
  const newBookList = books.filter((book) => {
    return book.id != id;
  });
  books = newBookList;
  setLocalStorage();
  removeList();
  start();
}

function removeList() {
  let i = 0;
  let child = booksList.lastElementChild;
  while (child) {
    booksList.removeChild(child);
    child = booksList.lastElementChild;
  }
}

function search() {}

function start() {
  books.forEach((book) => {
    updateUI(book);
  });
}

start();
