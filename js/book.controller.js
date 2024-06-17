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
                <button onclick="onUpdateBook()" class"update">Update</button>
                <button onclick="onRemoveBook()" class"delete">Delete</button>
            </td>
        </tr>
    `
    ) .join('')
}

function onRemoveBook(){
removeBook()
render()
}

function onUpdateBook(){
updatPrice()
render()
}

function onAddBook(){
onAddBook()
render()
}