'use strict'

function onInit() {
  render()
}

function render() {
  const books = getBooks()
  const tableBody = document.querySelector('tbody')

  tableBody.innerHTML = books
    .map(
      (book) => `
        <tr>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td>
                <button onclick="" class"read">Read</button>
                <button onclick="onUpdateBook(${book.id})" class"update">Update</button>
                <button onclick="onRemoveBook(${book.id})" class"delete">Delete</button>
            </td>
        </tr>
    `
    )
    .join('')
}

function onRemoveBook(bookId) {
  removeBook(bookId)
  render()
}

function onUpdateBook(bookId) {
  const newPrice = prompt('Enter New Price :')
  updatePrice(bookId, newPrice)
  render()

}

function onAddBook() {
  onAddBook()
  render()
}
