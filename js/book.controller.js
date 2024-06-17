'use strict'

var gFilterBy = ''

function onInit() {
  render()
}

function render() {
  const books = getBooks(gFilterBy)
  const tableBody = document.querySelector('tbody')

  tableBody.innerHTML = books
    .map(
      (book) => `
        <tr>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td>
                <button onclick="onShowBookDetails(event,'${book.id}')" class"read">Read</button>
                <button onclick="onUpdateBook('${book.id}')" class"update">Update</button>
                <button onclick="onRemoveBook(event,'${book.id}')" class"delete">Delete</button>
            </td>
        </tr>
    `
    )
    .join('')
}

function onRemoveBook(ev, bookId) {
  ev.stopPropagation()

  removeBook(bookId)
  render()
}

function onUpdateBook(bookId) {
  const newPrice = +prompt('Enter New Price: ')
  updatePrice(bookId, newPrice)
  render()
}

function onAddBook(ev) {
  ev.preventDefault()

  const elModal = document.querySelector('.add-book')
  const elNameInput = document.querySelector('.name-input')
  const elPriceInput = document.querySelector('.price-input')

  if (!elModal.open) {
    elNameInput.value = ''
    elPriceInput.value = ''
    elModal.showModal()
  } else {
    const title = elNameInput.value
    const price = elPriceInput.value

    if (!title || price < 0 || isNaN(price)) return

    addBook(title, price)
    render()
    elModal.close()
  }
}

function onShowBookDetails(ev, bookId) {
  ev.stopPropagation()

  const elDetails = document.querySelector('.book-details')
  const elPre = elDetails.querySelector('.book-details pre')

  const book = getBookById(bookId)

  elPre.innerText = JSON.stringify(book, null, 2)
  elDetails.showModal()
}

function onSetFilterBy(elSelect) {
  gFilterBy = elSelect.value
  render()
}

function clearSearch(){
  onSetFilterBy('')
document.querySelector('.search-input').value =''  
}