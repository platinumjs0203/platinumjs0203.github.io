const famous = document.querySelector(".famous")

function getSaying(){
    fetch("https://api.adviceslip.com/advice")
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        const say = json.slip.advice;
        famous.innerHTML = ` Today's wise saying <br>${say}`;
    });
}

getSaying()