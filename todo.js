const toDoForm = document.querySelector(".todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".todo-list");
const toDoFin = document.querySelector(".todo-list_fin")

let toDos = [];
let finish = [];
const TODOS = "todos"
const FINISHED = "finish"

function saveToDos(){
    localStorage.setItem(TODOS, JSON.stringify(toDos));
}
function saveFinshed(){
    localStorage.setItem(FINISHED, JSON.stringify(finish));
}
function loadToDos(){
    const getToDos = localStorage.getItem(TODOS)
    if(getToDos !== null){
        const parsed = JSON.parse(getToDos);
        parsed.forEach(function(carrot) {
            paintToDos(carrot.text)
        });
    }
}
function loadFinshed(){
    const getFinshed = localStorage.getItem(FINISHED)
    if(getFinshed !== null){
        const parsed = JSON.parse(getFinshed);
        parsed.forEach(function(carrot) {
            paintFinshed(carrot.text)
        });
    }
}

function paintToDos(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const okBtn = document.createElement("button")
    const newId = toDos.length + 1;
    const toDoObj = {
        text: text,
        id: newId
    };
    delBtn.addEventListener("click", deleteBtn)
    okBtn.addEventListener("click", checkBtn)
    okBtn.innerText = "Finish"
    delBtn.innerText = "Delete"
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(okBtn);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li)
    toDos.push(toDoObj);
    saveToDos();
}
function paintFinshed(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const newId = toDos.length + 1;
    const toDoObj = {
        text: text,
        id: newId
    };
    delBtn.addEventListener("click", deleteBtnF)
    delBtn.innerText = "Delete"
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoFin.appendChild(li)
    finish.push(toDoObj);
    saveFinshed();
}

function deleteBtn(e){
    function filterFn(tomato) {
        return tomato.id !== parseInt(li.id);
    }
    const btn = e.target;
    const li = btn.parentNode;
    toDoList.removeChild(li)
    const clean = toDos.filter(filterFn);
    toDos = clean;
    saveToDos();
}
function checkBtn(e){
    function filterFn(tomato) {
        return tomato.id !== parseInt(li.id);
    }
    const btn = e.target;
    const li = btn.parentNode;
    const finish = li.childNodes[0].innerText
    toDoList.removeChild(li)
    const clean = toDos.filter(filterFn);
    toDos = clean;
    paintFinshed(finish);
    saveToDos();
    saveFinshed();
}
function deleteBtnF(e){
    function filterFn(tomato) {
        return tomato.id !== parseInt(li.id);
    }
    const btn = e.target;
    const li = btn.parentNode;
    toDoFin.removeChild(li)
    const clean = finish.filter(filterFn);
    finish = clean;
    saveFinshed();
}

function handleToDos(e){
    const toDoValue = toDoInput.value;
    e.preventDefault();
    paintToDos(toDoValue);
    toDoInput.value = "";
}

toDoForm.addEventListener("submit", handleToDos)

function init(){
    loadToDos();
    loadFinshed();
}

init()