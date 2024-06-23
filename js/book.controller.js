'use strict'

const gQueryOptions = {
  filterBy: { title: '', minRating: 0 },
  sortBy: {},
  page: { idx: 0, size: 5 },
}
var gBookToEdit = null

function onInit() {
  renderBooks()
}

function renderBooks() {
  const books = getBooks(gQueryOptions)
  const tableBody = document.querySelector('tbody')

  tableBody.innerHTML = books
    .map(
      (book) => `
        <tr>
            <td><img class="preview-img" src="${book.imgUrl}"> ${
        book.title
      }</td>
            <td>${book.price}</td>
            <td>${'⭐️'.repeat(book.rating)}</td>
            <td>
                <button onclick="onShowBookDetails(event,'${
                  book.id
                }')" class"read">Read</button>
                <button onclick="onUpdateBook('${
                  book.id
                }')" class"update">Update</button>
                <button onclick="onRemoveBook(event,'${
                  book.id
                }')" class"delete">Delete</button>
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
  showMsg(`Book Removed:${bookId}`)
  renderBooks()
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
    var book = updatePrice(gBookToEdit.id,title, price, imgUrl)
  } else {
    var book = addBook(title, price, imgUrl)
  }

  showMsg(`Book Saved: ${book.id}`)
  renderBooks()
}

function onOpenAddBookModal() {
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
  const elUrlInput = elModal.querySelector('input[type="url"]')

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
  elBookModal.querySelector('.book-desc span').innerHTML = ` ${'⭐️'.repeat(
    book.rating
  )}
`
  elBookModal.showModal()
}

function onCloseBookDetails() {
  const elBookModal = document.querySelector('.book-details')
  elBookModal.close()
}

function onSetFilterBy(filterBy) {
  if (filterBy.title !== undefined) {
    gQueryOptions.filterBy.title = filterBy.title
  } else if (filterBy.minRating !== undefined) {
    gQueryOptions.filterBy.minRating = parseInt(filterBy.minRating) || 0
  }

  gQueryOptions.page.idx = 0

  renderBooks()
}

function clearSearch() {
  document.querySelector('.filter-by input[type="text"]').value = ''
  document.querySelector('.filter-by select').value = ''

  gQueryOptions.filterBy.title = ''
  gQueryOptions.filterBy.minRating = 0

  renderBooks()
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

function showMsg(msg) {
  const elMsg = document.querySelector('.msg')

  elMsg.innerText = msg
  elMsg.classList.add('open')
  setTimeout(() => {
    elMsg.classList.remove('open')
  }, 3000)
}
