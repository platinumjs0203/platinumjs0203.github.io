const imgBox = document.querySelector(".img_box");
const pokeName = document.querySelector(".poke_name");
const pokeType = document.querySelector(".poke_type");

const IMG_NUMBER = 809;

function paintImage(imgNumber){
    const image = new Image();
    image.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imgNumber < 10 ? `00${imgNumber}`: imgNumber < 100 ? `0${imgNumber}`:imgNumber}.png`
    imgBox.appendChild(image);
}

function pokedex(dexNum){
    fetch("pokedex.json")
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        const poke = json[dexNum].name.english;
        const type = json[dexNum].type;
        pokeName.innerHTML = `#00${dexNum + 1} : ${poke}`
        pokeType.innerHTML = `Type : ${type}`
    })
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    console.log(number)
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
    pokedex(randomNumber - 1)
}
init();
