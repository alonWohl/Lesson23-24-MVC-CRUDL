'use strict'

var gFilterBy = ''
var gBookToEdit = null

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
            <td>${'⭐️'.repeat(book.rating)}</td>
            <td>
                <button onclick="onShowBookDetails(event,'${book.id}')" class"read">Read</button>
                <button onclick="onUpdateBook('${book.id}')" class"update">Update</button>
                <button onclick="onRemoveBook(event,'${book.id}')" class"delete">Delete</button>
            </td>
        </tr>
    `
    )
    .join('')
  renderStatics(books)
}


function onRemoveBook(ev, bookId) {
  ev.stopPropagation()

  removeBook(bookId)
  render()
}

function onUpdateBook(bookId) {
  gBookToEdit = null
  const elModal = document.querySelector('.add-book')
  const elNameInput = elModal.querySelector('.name-input')
  const elPriceInput = elModal.querySelector('.price-input')
  const elUrlInput = elModal.querySelector('input[type="url"]')

  const book = getBookById(bookId)

  elNameInput.value = book.title
  elPriceInput.value = book.price
  elUrlInput.value = book.imgUrl

  gBookToEdit = book
  elModal.showModal()
}

function onSaveBook() {
  const elModal = document.querySelector('.add-book')
  const elNameInput = elModal.querySelector('.name-input')
  const elPriceInput = elModal.querySelector('.price-input')
  const elUrlInput = elModal.querySelector('input[type="url"]')

  const title = elNameInput.value
  const price = elPriceInput.value
  const imgUrl = elUrlInput.value

  if (gBookToEdit) {
    updatePrice(title, price, imgUrl)
  } else {
    addBook(title, price, imgUrl)
  }

  render()
}

function onAddBookModal() {
  gBookToEdit = null
  resetBookModal()
  const elModal = document.querySelector('.add-book')
  elModal.showModal()
}

function onCloseBookModal() {
  const elModal = document.querySelector('.add-book')
  elModal.close()
}

function resetBookModal() {
  const elModal = document.querySelector('.add-book')
  const elNameInput = elModal.querySelector('.name-input')
  const elPriceInput = elModal.querySelector('.price-input')
  const elUrlInput = elModal.querySelector('input[type="url"]');

  elNameInput.value = ''
  elPriceInput.value = ''
  elUrlInput.value = ''
}

function onShowBookDetails(ev, bookId) {
  ev.stopPropagation()

  const book = getBookById(bookId)
  const elBookModal = document.querySelector('.book-details')

  elBookModal.querySelector('.book-cover-img img').src = book.imgUrl
  elBookModal.querySelector('.book-desc h3').innerText = book.title
  elBookModal.querySelector('.book-desc p').innerText = book.details

  elBookModal.showModal()
}
function onCloseBookDetails() {
  const elBookModal = document.querySelector('.book-details')
  elBookModal.close()
}

function onSetFilterBy(elSelect) {
  gFilterBy = elSelect.value
  render()
}

function clearSearch() {
  onSetFilterBy('')
  document.querySelector('.search-input').value = ''
}

function renderStatics(books) {
  var average = 0
  var expensive = 0
  var cheap = 0

  books.forEach((book) => {
    if (book.price > 200) {
      expensive++
    }
    if (book.price >= 80 && book.price <= 200) {
      average++
    }
    if (book.price < 80) {
      cheap++
    }
  })
  const elStats = document.querySelector('footer')
  elStats.innerHTML = `Expensive : ${expensive} Average : ${average} Cheap : ${cheap}`
}
