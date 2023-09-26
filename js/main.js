 
let dataTableElement = document.getElementById("data");
var addformElement = document.getElementById("addForm");
var addButtonElement = document.getElementById("addBtn"); 
let data = getDataFromLocalStorage() || [
  { id: 1, title: "Atomic Habits", author: "James Clear", price: 20 },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho", price: 15 },
  { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", price: 18 },
  {
    id: 4,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 22,
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    price: 16,
  },
]; 

   
 saveInLocalStorage()  
 refreshTable()



function saveInLocalStorage() {
  try {
    const arrayString = JSON.stringify(data);
    localStorage.setItem("data", arrayString); 
  } catch (error) {
    console.error(`Error saving array to localStorage: ${error}`);
  }
}
function getDataFromLocalStorage() {
  try {
    const arrayString = localStorage.getItem("data");
    if (arrayString !== [] && arrayString !== null) {
      const array = JSON.parse(arrayString);
      return array;
    }
    console.log("ok")
    saveInLocalStorage(data);
      
  } catch (error) {
    console.error(`Error retrieving array from localStorage: ${error}`);
  }
}


function editBook( id, title, author, price ) { 
  const editForm = document.getElementById('editForm').classList.remove('d-none')
  const titleChild = document.getElementById('editForm').firstChild 
  titleChild.replaceWith(id) 
  const titleElement = document.getElementById("editTitle");
  const authorElement = document.getElementById("editAuthor");
  const priceElement = document.getElementById("editPrice");
  titleElement.value = title,
  authorElement.value = author
  priceElement.value = price;    
  addformElement.classList.add('d-none')

}


function refreshTable() {
  dataTableElement.innerHTML = "";
  data.forEach((el) => {
    dataTableElement.append(renderBook(el))
  })
}



function deleteBook(id) { 
   
  const index = data.findIndex((item) => item.id == id);
  console.log(index,id)
  if (window.confirm("Sur de supprimer?")) {
   if (index !== -1) {
     data.splice(index, 1);
     saveInLocalStorage(data);
   }
  } 
refreshTable();

}


function updateBook() {
  const idElement = document.getElementById("editForm").firstChild
  let id = (idElement);

  const titleElement = document.getElementById("editTitle");
  const authorElement = document.getElementById("editAuthor");
  const priceElement = document.getElementById("editPrice");
  console.log(data, parseInt(id.textContent));
  const index = data.findIndex((item) => item.id == parseInt(id.textContent));
  console.log(index)
  if (index !== -1) {
    data[index] = {
      ...data[index],
      title: titleElement.value,
      author: authorElement.value,
      price: priceElement.value,
    };
    document.getElementById('editForm').classList.add('d-none')
    resetFormEdit()
  }

  dataTableElement.innerHTML = ""
  data.forEach((el) => {
    dataTableElement.append(renderBook(el))
  })
  saveInLocalStorage(data);
}

function renderBook({ id, title, author, price }) { 
  const row = document.createElement("tr");
 
  const idCell = document.createElement("th");
  idCell.setAttribute("scope", "row");
  idCell.textContent = id;

  const titleCell = document.createElement("td");
  titleCell.textContent = title;

  const authorCell = document.createElement("td");
  authorCell.textContent = author;

  const priceCell = document.createElement("td");
  priceCell.textContent = price;
 
  const editCell = document.createElement('td')
  
  const editButton = document.createElement("button");
  editButton.setAttribute("type", "button");
  editButton.className = "btn btn-warning";  
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => {
     editBook(id, title, author, price);
  });
  editCell.appendChild(editButton)
  const deleteCell = document.createElement('td')  
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("type", "button");
  deleteButton.className = "btn btn-danger";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    deleteBook(id);
  });
  deleteCell.appendChild(deleteButton);
  row.appendChild(idCell);
  row.appendChild(titleCell);
  row.appendChild(authorCell);
  row.appendChild(priceCell);
  row.appendChild(editCell); 
  row.appendChild(deleteCell);
  return row
} 
function AddBook() { 
  const titleElement = document.getElementById("title").value;
  const authorElement = document.getElementById("author").value;
  const priceElement = document.getElementById("price").value; 

  let newBook = {
    id: data.length + 1,  
    title: titleElement,
    author: authorElement,
    price: priceElement,
  };

  data.push(newBook); 
  console.log(data);
  dataTableElement.append(renderBook(newBook));
  addformElement.classList.add("d-none");
  resetFormAdd();
  saveInLocalStorage(data);
  return alert("Livre ajouté!");
  
}


function showAddBookForm() {
  addformElement.classList.remove("d-none");
   
}


function resetFormAdd() {
    const titleElement = document.getElementById("title").value = "" ;
    const authorElement = document.getElementById("author").value  = "";
    const priceElement = document.getElementById("price").value = "";
  
}

function resetFormEdit() {
  const titleElement = (document.getElementById("editTitle").value = "");
  const authorElement = (document.getElementById("editAuthor").value = "");
  const priceElement = (document.getElementById("editPrice").value = "");

}

document.getElementById("addBtn").addEventListener("click", showAddBookForm);
document.getElementById("validateBtn").addEventListener("click", AddBook);
document.getElementById("resetBtn").addEventListener("click", resetFormAdd);
document.getElementById("resetEditBtn").addEventListener("click", resetFormEdit);
document.getElementById("resetEditBtn").addEventListener("click", resetFormEdit);
document.getElementById("validateEditBtn").addEventListener('click' ,updateBook);
