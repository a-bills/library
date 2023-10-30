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

function Book(title, author, category, genre, pages, read) {
    this.title = title;
    this.author = author;
    this.category = category;
    this.genre = genre;
    this.pages = pages;
    this.read = read;
}
Book.prototype.updateReadStatus = function () {
    this.read = (this.read ? false : true);
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
    for (const book of library) {
        const bookNode = generateBookNode(book, bookTemplate);
        mainSection.insertBefore(bookNode, bookTemplate);
    }
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

    return bookNode;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



function displayNewBook() {

}

function removeBook() {

}

