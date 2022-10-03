
document.addEventListener('DOMContentLoaded', () => {
    showBook();
});


const submitbook = document.getElementById('submit');
const Book = function (title, author, year, read) {
    this.id = +new Date();
    this.title = title;
    this.author = author;
    this.year= year;
    this.isComplete = read;
};


submitbook.addEventListener('click', function (e) {
    e.preventDefault();
    const bookname = document.getElementById('bookname').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const isComplete = document.getElementById('isComplete').checked;
    const book = new Book(bookname, author, year, isComplete);
    saveToLocalStorage(book);
    showBook();
});
// save to local storage
const saveToLocalStorage = (book) => {
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}


// show book
const showBook = () => {
    const books = JSON.parse(localStorage.getItem('books'));
    books.forEach((book) => {
        const list = document.getElementById('listbuku');
        const row = document.createElement('div');
        row.innerHTML = `
            <h3 class="bookTitle">Judul Buku ${book.title}</h3>
                <p class="bookAuthor">Penulis ${book.author}</p>
                <p class="bookYear">Tahun ${book.year}</p>
                <div class="action">
                <button class="green">Selesai dibaca</button>
                <button class="red" onclick="removeBook(${book.id})">Hapus buku</button>
            </div>
            
        `;
        list.appendChild(row);
        // add class
        row.classList.add('book-card');
    });
}

const removeBook = (id) => {
    const books = JSON.parse(localStorage.getItem('books'));
    books.forEach((book, index) => {
        if (book.id === id) {
            books.splice(index, 1);
        }
    });
    localStorage.setItem('books', JSON.stringify(books));
    showBook();
}

