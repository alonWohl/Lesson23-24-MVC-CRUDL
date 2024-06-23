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
  renderStatics(books)
}

function onRemoveBook(ev, bookId) {
  ev.stopPropagation()

  removeBook(bookId)
  render()
}

function onUpdateBook(bookId) {
  const currBook = getBookById(bookId)
  const newPrice = +prompt(
    `Current price is: ${currBook.price} Enter New Price: `
  )
  if (!newPrice) return
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

    addBook(title, price, imgUrl)
    render()
    elModal.close()
  }
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
