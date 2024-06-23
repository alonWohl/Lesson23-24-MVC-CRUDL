'use strict'

var gBooks = []
_createBooks()

function getBooks(filterBy) {
  if (!filterBy) return gBooks  
  const filteredBooks = gBooks.filter(book => book.title.toLowerCase().includes(gFilterBy.toLowerCase()))
return filteredBooks
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

function addBook(title,price,imgUrl) {
  const book = _createBook(title,price,imgUrl)
  gBooks.push(book)

  _saveBooks()

}

function _createBook(title,price,imgUrl){
  const id = makeid()
  return  {
    id: `${id}`,
    title,
    price,
    details:` ${loremIpsum(50)}`,
    imgUrl: imgUrl || `https://islandpress.org/sites/default/files/default_book_cover_2015.jpg`
  }
}

function _createBooks(){
  gBooks = loadFromStorage('books')
  if(gBooks && gBooks.length > 0) return

gBooks = [_createBook('A Song of Ice and Fire',120,`img/got1.jpg`), _createBook('A Clash of Kings',300,`img/got2.jpg`), _createBook('A Storm of Swords',87,`img/got3.jpg`)]
    _saveBooks()
}
function _saveBooks() {
  saveToStorage('books', gBooks)
}
