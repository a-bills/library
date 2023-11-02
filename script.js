const headerBtns = (function () {
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
    
    //To be removed after editing HTML/CSS
    dialog.showModal();
})();

const formBtns = (function () {
    //form.addEventListener('submit', (e)=> {
   // e.preventDefault();

})();

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

function Book(title, author, category, genre, pages, read) {
    this.title = title;
    this.author = author;
    this.category = category;
    this.genre = genre;
    this.pages = pages;
    this.read = read;
}

Book.prototype.updateReadStatus = function (readBtn) {
    // To animate the icon change, I could use setTimeout() on the 
    // setAttribute() methods below
    // Then add/remove the animation class in CSS w/ a transition within
    // that timeout window
    // Or have the attribute change at the height of the animation 
    // I.e., have the setTimeout() end at the height of the animation
    
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

function removeDemoLibrary() {
    const demoNodes = document.querySelectorAll('.demoBook');
    [...demoNodes].forEach((node) => {
        node.parentNode.removeChild(node);
    });
}

function displayDemoLibrary() {
    const library = generateDemoLibrary();
    const bookTemplate = document.querySelector('#hiddenBook');
    const mainSection = document.querySelector('main');
    library.forEach((book, index) => {
        const bookNode = generateBookNode(book, bookTemplate);
        bookNode.setAttribute('data-index', index);
        mainSection.insertBefore(bookNode, bookTemplate);
    });
    activateBookBtns(library);
}

function generateDemoLibrary() {
    const library = [];
    let book = {};
    for (let i = 0; i < 21; i++) {
        book = new Book(
            'Fun Book Title', 'John Smith', 'Fiction', 'Sci-Fi', '1000', true
        )
        book.demo = true;
        library.push(book);
    }
    return library;
}

function generateBookNode(book, hiddenBookTemplate) {
    const bookNode = hiddenBookTemplate.cloneNode(true);
    bookNode.removeAttribute('id');
    bookNode.classList.add('demoBook');

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

function displayNewBook() {
    //requires dialog w/ form
}



