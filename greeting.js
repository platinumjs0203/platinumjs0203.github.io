const main = document.querySelector("main")
const form = document.querySelector(".login_box");
const inputName = form.querySelector(".input_name");
const loginBtn = form.querySelector(".login_btn")
const welcome = document.querySelector(".welcome")

const USER_NAME = "username"
const INVISIBLE = "invisible"

function saveName(name){
    localStorage.setItem(USER_NAME, name)
}
function loadName(){
    const currentUser = localStorage.getItem(USER_NAME)
    if(currentUser === null){
        return
    } else {
        paintName(currentUser);
    }
}

function paintName(text){
    form.classList.add(INVISIBLE)
    main.classList.remove(INVISIBLE)
    welcome.innerHTML = `Welcome! ${text}`
}

function handleSubmit(e){
    const inputValue = inputName.value; 
    e.preventDefault();
    saveName(inputValue);
    paintName(inputValue)
}

form.addEventListener("submit", handleSubmit)

function init(){
    loadName();
}
init()