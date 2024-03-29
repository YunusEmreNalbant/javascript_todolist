// Tüm elementleri seçme

const form = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo');
const todoList = document.querySelector('.list-group');
const firstCardBody = document.querySelectorAll('.card-body')[0];
const secondCardBody = document.querySelectorAll('.card-body')[1];
const filter = document.querySelector('#filter');
const clearButton = document.querySelector('#clear-todos');


eventListeners();


function eventListeners() { // Tüm event listenerlar

    form.addEventListener('submit',addTodo)

    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);

    secondCardBody.addEventListener("click",deleteTodo);
}

function deleteTodo(e) {


    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);

        showAlert('success','Todo başarı ile silindi!')
    }

}

function deleteTodoFromStorage(deletetodo) {
   let todos = getTodosFromStorage();
   todos.forEach(function (todo,index) {
       if(todo === deletetodo){
            todos.splice(index,1); // arrayden değeri silme
       }
   });

   localStorage.setItem("todos",JSON.stringify(todos));




}
function loadAllTodosToUI() {

    let todos = getTodosFromStorage();

    todos.forEach(function (todo) {
        addTodoToUI(todo)
    })

}

function addTodo(e) {


    const newTodo = todoInput.value.trim();

    if(newTodo === "" ){

        showAlert("danger","Lütfen bir todo girin...");
    }else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);

        showAlert("success","Todo başarı ile eklendi...")
    }



    e.preventDefault();
}

function getTodosFromStorage() { //Storagedan todoları almak

    let todos;

    if(localStorage.getItem("todos")===null){
        todos=[];

    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo) {

    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
}

function showAlert(type,message) {
    const alert = document.createElement('div');
    alert.className=`alert alert-${type}`;
    alert.textContent=message

    firstCardBody.appendChild(alert); //formumuza alertimizi ekliyoruz.

    // setTimeout metodunu kullanma

    window.setTimeout(function () {
        alert.remove();
    },3000)

}

function addTodoToUI(newTodo) { // String değerini list item olarak UI'ya ekleyecek.

    //list item oluşturma
    const listItem = document.createElement('li');

    //link oluşturma
    const link = document.createElement('a');
    link.href = '#';
    link.className = 'delete-item';
    link.innerHTML = "<i class='fa fa-remove'></i>"

    listItem.className ='list-group-item d-flex justify-content-between';

    // Text Node Ekleme

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // Todo list'e list item'i ekleme

    todoList.appendChild(listItem);
    todoInput.value=""; //ekledikten sonra texti temizle.


}


