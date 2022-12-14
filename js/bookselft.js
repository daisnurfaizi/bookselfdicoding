
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
    alertSuccess();
}


// show book
const showBook = () => {
    const list = document.getElementById('listbukubelumdibaca');
    const listbaca = document.getElementById('listbukubelumselesaidibaca');
    const books = JSON.parse(localStorage.getItem('books'));
    if(books!=null){
        list.innerHTML = '';
        listbaca.innerHTML = '';
        books.map((book) => {
            if(book.isComplete){
                isReaded(book,listbaca);
            }else{
                isNotReaded(book,list);
            }
        });
    }
}
const isReaded = (book,list) => {    
    const row = document.createElement('div');
                row.innerHTML = `
                <h3 class="bookTitle">Judul Buku ${book.title}</h3>
                    <p class="bookAuthor">Penulis ${book.author}</p>
                    <p class="bookYear">Tahun ${book.year}</p>
                    <div class="action">
                    <button class="green" onclick="unReadBook(${book.id})">Belum Selesai Dibaca</button>
                    <button class="red" onclick="removeBook(${book.id})">Hapus buku</button>
                </div>
            `;
            list.appendChild(row);
           return  row.classList.add('book-card');
}

const isNotReaded = (book,list) => {
   
    const row = document.createElement('div');
                row.innerHTML = `
                <h3 class="bookTitle">Judul Buku ${book.title}</h3>
                    <p class="bookAuthor">Penulis ${book.author}</p>
                    <p class="bookYear">Tahun ${book.year}</p>
                    <div class="action">
                    <button class="green" onclick="readBook(${book.id})">Selesai Dibaca</button>
                    <button class="red" onclick="removeBook(${book.id})">Hapus buku</button>
                </div>
            `;
            list.appendChild(row);
            return row.classList.add('book-card');
}

const removeBook = (id) => {
    const books = JSON.parse(localStorage.getItem('books'));
    books.forEach((book, index) => {
        if (book.id === id) {
            // confirm delete
            if (confirm('Apakah anda yakin ingin menghapus buku ini?')) {
                books.splice(index, 1);
            }
        }
    });
    localStorage.setItem('books', JSON.stringify(books));
    showBook();
    alertDelete();
}

const readBook = (id) => {
    const books = JSON.parse(localStorage.getItem('books'));
    books.forEach((book, index) => {
        if (book.id === id) {
            books[index].isComplete = true;
        }
    });
    localStorage.setItem('books', JSON.stringify(books));
    showBook();
}
const unReadBook = (id) => {
    const books = JSON.parse(localStorage.getItem('books'));
    books.forEach((book, index) => {
        if (book.id === id) {
            books[index].isComplete = false;
        }
    });
    localStorage.setItem('books', JSON.stringify(books));
    showBook();
}


const search = document.getElementById('search');
search.addEventListener('keyup', function (e) {
    const list = document.getElementById('listbukubelumdibaca');
    const listbaca = document.getElementById('listbukubelumselesaidibaca');
    const books = JSON.parse(localStorage.getItem('books'));
    const searchValue = e.target.value.toLowerCase();
    // filter by title and author and year 
    const filteredBooks = books.filter((book) => {
        return book.title.toLowerCase().includes(searchValue) || book.author.toLowerCase().includes(searchValue) || book.year.toLowerCase().includes(searchValue);
    });
    list.innerHTML = '';
    listbaca.innerHTML = '';
    filteredBooks.map((book) => {
        if(book.isComplete){
            isReaded(book,listbaca);
        }else{
            isNotReaded(book,list);
        }
    });
});

const alertSuccess = () => {
    const alert = document.getElementById('alert');
    const message = document.getElementById('message');
    alert.classList.add('alert-bg-success');
    message.textContent = 'Buku berhasil ditambahkan';
    setTimeout(() => {
        alert.classList.remove('alert-bg-success');
        message.textContent = '';
    }, 3000);
}
const alertDelete = () => {
    const alert = document.getElementById('alert');
    const message = document.getElementById('message');
    alert.classList.add('alert-bg-delete');
    message.textContent = 'Buku berhasil dihapus';
    setTimeout(() => {
        alert.classList.remove('alert-bg-delete');
        message.textContent = '';
    }, 3000);
}
