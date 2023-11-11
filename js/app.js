const DuckContainer = document.getElementById("Duck");
const mychart = document.getElementById("mychart")
const Button = document.getElementById("ShowResults");


const image1 = document.querySelector('#Duck figure:first-child img');
const caption1 = document.querySelector('#Duck figure:first-child figcaption');
const image2 = document.querySelector('#Duck figure:nth-child(2) img');
const caption2 = document.querySelector('#Duck figure:nth-child(2) figcaption');
const image3 = document.querySelector('#Duck figure:nth-child(3) img');
const caption3 = document.querySelector('#Duck figure:nth-child(3) figcaption');


let state = {
  numClicksSoFar: 0,
  numClicksAllowed: 25,
  allDuck: [],
  threeImages: [],

};

function Duck(name, image) {
  this.name = name;
  this.imageFile = image;
  this.votes = 0;
  this.views = 0;
  state.allDuck.push(this);
}

function renderDucks() {

  function pickRandomDuck() {
    return Math.floor(Math.random() * state.allDuck.length);
  }

  let Duck1 = pickRandomDuck();
  let Duck2 = pickRandomDuck();
  let Duck3 = pickRandomDuck();
  while (Duck1 === Duck2 || Duck1 === Duck3 || state.threeImages.includes(Duck1)) {
    Duck1 = pickRandomDuck();
  }

  while (Duck2 === Duck3 || Duck2 === Duck1 || state.threeImages.includes(Duck2)) {
    Duck2 = pickRandomDuck();
  };

  while (Duck3 === Duck1 || Duck3 === Duck2 || state.threeImages.includes(Duck3)) {
    Duck3 = pickRandomDuck();
  }
  image1.src = state.allDuck[Duck1].imageFile;
  image1.alt = Duck1.name;
  caption1.textContent = state.allDuck[Duck1].name;

  image2.src = state.allDuck[Duck2].imageFile;
  image2.alt = Duck2.name;
  caption2.textContent = state.allDuck[Duck2].name;

  image3.src = state.allDuck[Duck3].imageFile;
  image3.alt = Duck3.name;
  caption3.textContent = state.allDuck[Duck3].name;

  state.allDuck[Duck1].views++;
  state.allDuck[Duck2].views++;
  state.allDuck[Duck3].views++;
}
function renderResultButton() {
  Button.style.display = "block";
}

function renderResults() {
  let DuckNames = [];
  let DuckVotes = [];
  let DuckViews = [];

  for (let i = 0; i < state.allDuck.length; i++) {
    DuckNames.push(state.allDuck[i].name);
    DuckVotes.push(state.allDuck[i].votes);
    DuckViews.push(state.allDuck[i].views);
  }
  DuckNames.push("Total Votes");
  DuckVotes.push(state.totalVotes);
  DuckViews.push(state.totalViews);

  console.log(DuckNames);
  console.log(DuckVotes);
  console.log(DuckViews);

  const data = {
    labels: DuckNames,
    datasets: [
      {
        label: 'Votes',
        data: DuckVotes,
        borderWidth: 1,
        backgroundColor: ['green']

      },
      {
        label: 'Views',
        data: DuckViews,
        borderWidth: 1,
        backgroundColor: ['rebeccapurple']
      }
    ]
  }
  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }
  const chart = new Chart(mychart, config);
}


function saveStateToLocalStorage() {
  localStorage.setItem("duckState", JSON.stringify(state));
}

function loadStateFromLocalStorage() {
  const storedState = localStorage.getItem("duckState");
  if (storedState) {
    state = JSON.parse(storedState);
  }
}

window.addEventListener("beforeunload", () => {
  saveStateToLocalStorage();
});
function handleClick(event) {
  let DuckName = event.target.alt;
  for (let i = 0; i < state.allDuck.length; i++) {
    if (DuckName === state.allDuck[i].name) {
      state.allDuck[i].votes++;
      state.totalVotes++;
      break;
    }
  }
  state.numClicksSoFar++;

  if (state.numClicksSoFar >= state.numClicksAllowed) {
    removeEventListener();
    renderResultButton();
  } else {
    renderDucks();
  }
}

function setupListener() {
  DuckContainer.addEventListener("click", handleClick);
  Button.addEventListener("click", renderResults);
}
function removeEventListener() {
  DuckContainer.removeEventListener("click", handleClick);
}


new Duck("R2D2 Bag", "images/assets/bag.jpg");
new Duck("Banana", "images/assets/banana.jpg");
new Duck("Bathroom", "images/assets/bathroom.jpg");
new Duck("Boots", "images/assets/boots.jpg");
new Duck("Breakfast", "images/assets/breakfast.jpg");
new Duck("Bubblegum", "images/assets/bubblegum.jpg");
new Duck("Chair", "images/assets/chair.jpg");
new Duck("Cthulhu", "images/assets/cthulhu.jpg");
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


renderDucks();
setupListener();
loadStateFromLocalStorage();
