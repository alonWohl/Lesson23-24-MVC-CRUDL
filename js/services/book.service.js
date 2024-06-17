'use strict'

var gBooks = []
_createBooks()

function getBooks() {
  return gBooks
}

function getBookById(bookId) {         
	const book = gBooks.find(book => book.id === bookId)
	return book
}

function removeBook(bookId) {
  const idx = gBooks.findIndex((book) => book.id === bookId)
  gBooks.splice(idx, 1)

  _saveBooks()

}

function updatePrice(bookId, newPrice) {
  const book = getBookById(bookId)
  book.price = newPrice

  _saveBooks()

}

function addBook(title,price) {
  const book = _createBook(title,price)
  gBooks.push(book)

  _saveBooks()

}

function _createBook(title,price){
  const id = makeid()
  return  {
    id: `${id}`,
    title,
    price,
  }
}

function _createBooks(){
  gBooks = loadFromStorage('books')
  if(gBooks && gBooks.length > 0) return

gBooks = [_createBook('The Adventures of Lori Ipsi',120), _createBook('World Atlas',300), _createBook('Zorba the Greek',87)]
    _saveBooks()
}
function _saveBooks() {
  saveToStorage('books', gBooks)
}