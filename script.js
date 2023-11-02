function Book(title, author, category, genre, pages, read) {
    this.title = title;
    this.author = author;
    this.category = category;
    this.genre = genre;
    this.pages = pages;
    this.read = read;
}
Book.prototype.updateReadStatus = function (readBtn) {
    if (this.read) {
        readBtn.setAttribute('src', './assets/book-remove.svg');
        this.read = false;
    } else {
        readBtn.setAttribute('src', './assets/book-check.svg');
        this.read = true;
    }
}
Book.prototype.removeBook = function () {

}

const buttons = (function () {
    const demoBtn = document.querySelector('#demoBtn');
    demoBtn.addEventListener('click', () => {
        if (demoBtn.innerText === 'Display Demo') {
            displayDemoLibrary();
            demoBtn.innerText = 'Remove Demo'
        } else {
            removeDemoLibrary();
            demoBtn.innerText = 'Display Demo'
        }
    });

    const newBookBtn = document.querySelector('#newBook');
    const dialog = document.querySelector('dialog');
    newBookBtn.addEventListener('click', () => {
        dialog.showModal();
    });

    const closeFormBtn = document.querySelector('#form-container > img');
    closeFormBtn.addEventListener('click', () => {

    });

})();

const processForm = (function () {
    const form = document.querySelector('form');
    const formInput = document.querySelectorAll('input, select');
    const dialog = document.querySelector('dialog');
    const mainLibrary = [];


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        dialog.close();
        const inputValues = [];

        [...formInput].forEach(node => {
            inputValues.push(node.value);
            node.value = '';
        });

        const book = new Book(...inputValues);
        mainLibrary.push(book);
        displayUpdatedLibrary(mainLibrary);
        activateBookBtns(mainLibrary);
    });
})();

function displayUpdatedLibrary(mainLibrary) {
    const bookTemplate = document.querySelector('#hiddenBook');
    const index = mainLibrary.length - 1;
    const book = mainLibrary[index];
    const bookNode = generateBookNode(book, bookTemplate);
    const mainSection = document.querySelector('main');
    const readBtn = bookNode.querySelector('.read');
    
    bookNode.setAttribute('data-index', index);
    bookNode.classList.add('userBook');
    book.updateReadStatus(readBtn);

    mainSection.appendChild(bookNode, bookTemplate);
}

function displayDemoLibrary() {
    const demoLibrary = generateDemoLibrary();
    const bookTemplate = document.querySelector('#hiddenBook');
    const mainSection = document.querySelector('main');
    demoLibrary.forEach((book, index) => {
        const bookNode = generateBookNode(book, bookTemplate);
        bookNode.setAttribute('data-index', index);
        bookNode.classList.add('demoBook');
        mainSection.insertBefore(bookNode, bookTemplate);
    });
    activateBookBtns(demoLibrary);
}

function generateDemoLibrary() {
    const demoLibrary = [];
    let book = {};
    for (let i = 0; i < 21; i++) {
        book = new Book(
            'Fun Book Title', 'John Smith', 'Fiction', 'Sci-Fi', '1000', true
        )
        book.demo = true;
        demoLibrary.push(book);
    }
    return demoLibrary;
}

function removeDemoLibrary() {
    const demoNodes = document.querySelectorAll('.demoBook');
    [...demoNodes].forEach((node) => {
        node.parentNode.removeChild(node);
    });
}

function generateBookNode(book, hiddenBookTemplate) {
    const bookNode = hiddenBookTemplate.cloneNode(true);
    bookNode.removeAttribute('id');

    for (const property in book) {

        switch (property) {
            case ('title'):
                bookNode.querySelector('.title').innerText =
                    book[property];
                break;
            case ('author'):
                bookNode.querySelector('.author').innerText =
                    `by ${book[property]}`;
                break;
            case ('category'): case ('genre'): case ('pages'):
                bookNode.querySelector(`.${property}`).innerText =
                    `${capitalizeFirstLetter(property)}: ${book[property]}`;
                break;
            case ('read'):
                bookNode.querySelector(`.${property}`).setAttribute('data-read', book[property]);
                break;
        }
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return bookNode;
}

function activateBookBtns(library) {

    const readBtns = document.querySelectorAll('.read');
    readBtns.forEach(btn => btn.addEventListener('click', () => {
        const book = btn.closest('.book');
        const index = book.getAttribute('data-index');
        library[index].updateReadStatus(btn);
    }));

    const removeBtns = document.querySelectorAll('.remove-book');
    removeBtns.forEach(btn => btn.addEventListener('click', () => {
        const book = btn.closest('.book');
        const index = book.getAttribute('data-index');
        library[index].removeBook(btn);
    }));
}



