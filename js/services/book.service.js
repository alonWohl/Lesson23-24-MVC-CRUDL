'use strict'

var gBooks
_createBooks()

function getBooks(options = {}) {
  const filterBy = options.filterBy
  const sortBy = options.sortBy
  const page = options.page

  var books = gBooks
  books = _filterBooks(filterBy)

  return books
}

function _filterBooks(filterBy) {
  var books = gBooks
  if (filterBy.title)
    books = books.filter((book) =>
      book.title.toLowerCase().includes(filterBy.title.toLowerCase())
    )
  if (filterBy.minRating)
    books = books.filter((book) => book.rating >= filterBy.minRating)
  return books
}

function getBookById(bookId) {
  const book = gBooks.find((book) => book.id === bookId)
  return book
}

function removeBook(bookId) {
  const idx = gBooks.findIndex((book) => book.id === bookId)
  gBooks.splice(idx, 1)

  _saveBooks()
}

function updatePrice(bookId, newTitle, newPrice, newImgUrl) {
  const book = getBookById(bookId)
  book.title = newTitle
  book.price = newPrice
  book.imgUrl = newImgUrl

  _saveBooks()
}

function addBook(title, price, imgUrl) {
  const book = _createBook(title, price, imgUrl)
  gBooks.unshift(book)

  _saveBooks()
}

function _createBook(title, price, imgUrl) {
  const id = makeid()
  return {
    id: `${id}`,
    title,
    price,
    details: ` ${loremIpsum(50)}`,
    imgUrl: imgUrl || 'img/default_book_cover.jpg',
    rating: getRandomIntInclusive(1, 5),
  }
}

function _createBooks() {
  gBooks = loadFromStorage('books')
  if (gBooks && gBooks.length > 0) return
  gBooks = []
  const bookNames = [
    'A Song of Ice and Fire',
    'A Clash of Kings',
    'A Storm of Swords',
    'A Feast for Crows',
    'A Dance with Dragons',
  ]
  for (let i = 0; i < 10; i++) {
    const bookTitle = bookNames[getRandomIntInclusive(0,4)]

    const book = _createBook(
      bookTitle,
      getRandomIntInclusive(0, 500),
      `img/got${bookNames.indexOf(bookTitle) + 1}.jpg`
    )
    gBooks.push(book)
  }
  _saveBooks()
}

function _saveBooks() {
  saveToStorage('books', gBooks)
}
