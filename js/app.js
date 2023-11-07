const DuckContainer = document.getElementById("Duck");
const ReoprtContainer = document.getElementById("Report");

const image1 = document.querySelector('#Duck img:first-child');
const image2 = document.querySelector('#Duck img:nth-child(2)');
const image3 = document.querySelector('#Duck img:nth-child(3)');

const Button = document.getElementById("ShowResults");

let state = {
    numClicksSoFar: 0,
    numClicksAllowed: 25,
    allDuck: [],
}

function Duck(name, image) {
    this.name = name;
    this.imageFile = image;
    this.votes = 0;
    this.views = 0;
    state.allDuck.push(this);
}
console.log(Duck);

function renderImages(){
    function pickRandomImage(){
        return Math.floor(Math.random() * state.allDuck.length );
    }
    let Duck1 = pickRandomImage();
    let Duck2 = pickRandomImage();
    let Duck3 = pickRandomImage();

    while(Duck1 === Duck2 || Duck1 === Duck3 || Duck2 === Duck3) {
        Duck2 = pickRandomImage();
        Duck3 = pickRandomImage();
    }
    image1.src = state.allDuck[Duck1].imageFile;
    image1.alt = state.allDuck[Duck1].name;

    image2.src = state.allDuck[Duck2].imageFile;
    image2.alt = state.allDuck[Duck2].name;

    image3.src = state.allDuck[Duck3].imagefile;
    image3.src = state.allDuck[Duck3].name;

    state.allDuck[Duck1].views++;
    state.allDuck[Duck2].views++;
    state.allDuck[Duck3].views++;

}
function removeButton(){
    Button.style.display = 'none';
}

function renderResultButton() {
    Button.style.display = "block";
}
function ShowResults(){
    for(let i = 0; i < state.allDuck.length; i++){
        let Duckresult = document.createElement('p');
        Duckresult.textContent = (`${state.allDuck[i].name} votes: ${Number(state.allDuck[i].votes)} views: ${state.allDuck[i].views}`);
        DuckContainer.appendChild(Duckresult);
    }

}

function handleClick(event){
    let imageName = event.target.alt;
    for ( let i = 0; i < state.allDuck.length; i++){
        if(imageName === state.allDuck[i].name){
            state.allDuck[i].votes++;
            break;
        }
    }
    if(state.numClicksSoFar >= state.numClicksAllowed){
        DuckContainer.removeEventListener("click", clickEvent);
        removeEventListener();
        renderResultButton();
    }
    else {
        state.numClicksSoFar++;
        renderImages();
    }
}
function setupListener(){
    DuckContainer.addEventListener("click", handleClick);
    Button.addEventListener("click",ShowResults);
}

new Duck("R2D2 Bag", "images/assets/bag.jpg");
new Duck("Banana", "images/assets/banana.jpg");
new Duck("Bathroom", "images/assets/bathroom.jpg");
new Duck("Boots", "images/assets/boots.jpg");
new Duck("Breakfast", "images/assets/breakfast.jpg");
new Duck("Bubblegum", "images/assets/bubblegum.jpg");
new Duck("Chair","images/assets/chair.jpg");
new Duck("Cthulhu", "images/assets/cthulhu.jpg") ;
new Duck("Dog Duck", "images/assets/dog-duck.jpg");
new Duck("Dragon", "images/assets/dragon.jpg");
new Duck("Pen", "images/assets/pen.jpg");
new Duck("Pet Sweep", "images/assets/pet-sweep.jpg");
new Duck("Scissors", "images/assets/scissors.jpg");
new Duck("Shark", "images/assets/shark.jpg");
new Duck("Sweep", "images/assets/sweep.png");
new Duck("Tauntaun", "images/assets/tauntaun.jpg");
new Duck("Unicorn", "images/assets/unicorn.jpg");
new Duck("Water can", "images/assets/water-can.jpg");
new Duck("Wine glass", "images/assets/wine-glass.jpg");

renderImages();
setupListener();


