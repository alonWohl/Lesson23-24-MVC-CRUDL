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
                <button class"read">Read</button>
                <button class"update">Update</button>
                <button class"delete">Delete</button>
            </td>
        </tr>
    `
    ) .join('')
}
