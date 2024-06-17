'use strict'

const gBooks = [
  {
    id: makeid(),
    title: 'The Adventures of Lori Ipsi',
    price: 120,
  },
  {
    id: makeid(),
    title: 'World Atlas',
    price: 300,
  },
  {
    id: makeid(),
    title: 'Zorba the Greek',
    price: 87,
  },
]

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
}

function updatePrice(bookId, newPrice) {
  const book = getBookById(bookId)
  book.price = newPrice
}

function addBook(title,price) {
  const id = makeid()
  const book = {
    id: `${id}`,
    title,
    price,
  } 
  gBooks.push(book)
}
