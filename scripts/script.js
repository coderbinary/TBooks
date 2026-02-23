let myLibrary = [
  {
    id: crypto.randomUUID(),
    bookTitle: "Wuthering Heights",
    bookAuthor: "Emily Brontë",
    bookPages: 416,
    bookDesc: `"Wuthering Heights" by Emily Brontë is a novel published in 1847. Set on the Yorkshire moors, it follows two landowning families and their turbulent relationships with Heathcliff, a mysterious foster son.`,
    pagesRead: 0
  },
  {
    id: crypto.randomUUID(),
    bookTitle: "Crime and Punishment",
    bookAuthor: "Fyodor Dostoevsky",
    bookPages: 720,
    bookDesc: `"Crime and Punishment" by Fyodor Dostoevsky is a novel published in 1866. It follows Rodion Raskolnikov, an impoverished former law student in Saint Petersburg who plans to murder an unscrupulous pawnbroker.`,
    pagesRead: 0
  },
  {
    id: crypto.randomUUID(),
    bookTitle: "Beyond Good and Evil",
    bookAuthor: "Friedrich Wilhelm Nietzsche",
    bookPages: 240,
    bookDesc: `"Beyond Good and Evil" by Friedrich Wilhelm Nietzsche is a philosophical work published in 1886. Nietzsche launches a fierce attack on traditional philosophy, accusing past thinkers of disguising moral prejudices as objective truth.`,
    pagesRead: 0
  },
  {
    id: crypto.randomUUID(),
    bookTitle: "The Brothers Karamazov",
    bookAuthor: "Fyodor Dostoevsky",
    bookPages: 824,
    bookDesc: `"The Brothers Karamazov" by Fyodor Dostoevsky is a novel published in 1880. It explores faith, doubt, free will, and morality through the lives of the three Karamazov brothers and their troubled father.`,
    pagesRead: 0
  }
];


const books = document.querySelector(".content");
const addBookButton = document.querySelector(".add-book");
const addBookDialog = document.querySelector(".add-book--dialog");
const addEntryButton = document.querySelector(".add-entry");
const addBookForm = document.querySelector("#add-book--form");
const closeDialog = document.querySelector(".close-dialog");

myLibrary.forEach((book)=>{
    let bookCard = createBookElement(book);
    books.append(bookCard);
});

closeDialog.addEventListener("click",(e)=>{
  const form = e.target.closest("form");
  if(form.children["2"].value === "" && form.children["4"].value === "" && form.children["6"].value === "" && form.children["8"].value === ""){
    addBookDialog.close();
  }
})

addBookForm.addEventListener("submit",(submitEvent)=>{
  submitEvent.preventDefault();
  addBookDialog.close();
  books.innerHTML=``;
  addBookToLibrary(submitEvent.target["0"].value,submitEvent.target["1"].value,submitEvent.target["2"].value,submitEvent.target["3"].value);
})
addBookButton.addEventListener("click",()=>{
  addBookDialog.showModal();
})


function Book(bookTitle,bookAuthor,bookPages,bookDesc){
  this.id = crypto.randomUUID();
  this.bookTitle = bookTitle;
  this.bookAuthor = bookAuthor;
  if(bookPages === ""){
    this.bookPages = "Unknown";
  }else{
    this.bookPages = bookPages;
  }
  if(bookDesc === ""){
    this.bookDesc = "Unknown";
  }else{
    this.bookDesc = bookDesc;
  }
  this.pagesRead = 0;
  
}
function addBookToLibrary(bTitle,bAuthor,bPages,bDesc){
  const book = new Book(bTitle,bAuthor,bPages,bDesc);
  myLibrary.push(book);
  addBooks(myLibrary);
}

function addBooks(library){
  library.forEach((book) => {
    let bookCard = createBookElement(book);
    books.append(bookCard);
  });
}

function createBookElement(book) {

  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book", "book-theme");
  bookDiv.dataset.id = book.id;

  // Title
  const title = document.createElement("h4");
  title.textContent = book.bookTitle;

  // Author
  const small = document.createElement("small");
  small.innerHTML = `By <span class="author">${book.bookAuthor}</span>`;

  // Total Pages
  const totalPagesContainer = document.createElement("p");
  totalPagesContainer.classList.add("total-pages--container");
  totalPagesContainer.innerHTML = `
    Total Pages: <span class="total-pages">${book.bookPages}</span>
  `;

  // Description
  const description = document.createElement("p");
  description.classList.add("book-description");
  description.textContent = book.bookDesc;

  // Buttons Container
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons-container");

  // ===== Pages Section =====
  const pagesDiv = document.createElement("div");
  pagesDiv.classList.add("pages");

  const decrementBtn = document.createElement("button");
  decrementBtn.classList.add("decrement", "button-theme");
  decrementBtn.innerHTML = `<i class="fa-solid fa-minus"></i>`;

  const pagesRead = document.createElement("p");
  pagesRead.classList.add("pages-read");
  pagesRead.textContent = book.pagesRead; // ← dynamic now

  const incrementBtn = document.createElement("button");
  incrementBtn.classList.add("increment", "button-theme");
  incrementBtn.innerHTML = `<i class="fa-solid fa-plus"></i>`;

  // ===== Increment / Decrement Logic =====
  incrementBtn.addEventListener("click", () => {
    if (book.pagesRead < book.bookPages) {
      book.pagesRead++;
      pagesRead.textContent = book.pagesRead;
    }
  });

  decrementBtn.addEventListener("click", () => {
    if (book.pagesRead > 0) {
      book.pagesRead--;
      pagesRead.textContent = book.pagesRead;
    }
  });

  pagesDiv.append(pagesRead, decrementBtn, incrementBtn);

  // ===== Action Buttons =====
  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("buttons");

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("book-delete", "button-theme");
  deleteBtn.textContent = "Delete";

  const editBtn = document.createElement("button");
  editBtn.classList.add("book-edit", "button-theme");
  editBtn.textContent = "Edit";

  actionsDiv.append(deleteBtn, editBtn);

  buttonsContainer.append(pagesDiv, actionsDiv);

  bookDiv.append(
    title,
    small,
    totalPagesContainer,
    description,
    buttonsContainer
  );

  return bookDiv;
}