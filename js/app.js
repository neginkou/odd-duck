const DuckContainer = document.getElementById("Duck");
const mychart = document.getElementById("mychart")


const image1 = document.querySelector('#Duck img:first-child');
const image2 = document.querySelector('#Duck img:nth-child(2)');
const image3 = document.querySelector('#Duck img:nth-child(3)');

const Button = document.getElementById("ShowResults");

let state = {
  numClicksSoFar: 0,
  numClicksAllowed: 25,
  allDuck: [],
};

function Duck(name, image, votes = 0, views = 0) {
  this.name = name;
  this.imageFile = image;
  this.votes = votes;
  this.views = views;
  state.allDuck.push(this);
}
function loadLocalStorageData() {
  const storedData = localStorage.getItem('Duck');
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    for (let i = 0; i < parsedData.allDuck.length; i++) {
      let p = parsedData.allDuck[i];
      new Duck(p.name, p.imageFile, p.votes, p.views);
    }
  } else {
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

  }
  console.log(state);
}
function saveLocalStorageData() {

  const dataToStore = {
    allDuck: state.allDuck,
  };
  localStorage.setItem('Duck', JSON.stringify(dataToStore));
}
function renderDucks() {
  function pickRandomDuck() {
    return Math.floor(Math.random() * state.allDuck.length);
  }

  let Duck1, Duck2, Duck3;
  Duck1 = pickRandomDuck();

  while (true) {
    Duck2 = pickRandomDuck();
    if (Duck2 !== Duck1) {
      break;
    }
  }
  while (true) {
    Duck3 = pickRandomDuck();
    if (Duck3 !== Duck1 && Duck3 !== Duck2) {
      break;
    }
  }
  image1.src = state.allDuck[Duck1].imageFile;
  image1.alt = state.allDuck[Duck1].name;


  image2.src = state.allDuck[Duck2].imageFile;
  image2.alt = state.allDuck[Duck2].name;


  image3.src = state.allDuck[Duck3].imageFile;
  image3.alt = state.allDuck[Duck3].name;


  state.allDuck[Duck1].views++;
  state.allDuck[Duck2].views++;
  state.allDuck[Duck3].views++;
}
function renderResultButton() {
  Button.style.display = 'block';
  renderResults();
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
  };
  const config = {
    type: 'bar',
    data: data,
    options: {
      Responsive: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  const chart = new Chart(mychart, config);
}
function initializeApp() {
  loadLocalStorageData();
  renderDucks();
  setupListeners();
}
function handleClick(event) {
  let DuckName = event.target.alt;

  for (let i = 0; i < state.allDuck.lenght; i++) {
    if (DuckName === state.allDuck[i].name) {
      state.allDuck[i].votes++;
      break;
    }

  }
  state.numClicksSoFar++;

  if (state.numClicksSoFar >= state.numClicksAllowed) {
    removeListener();

    renderResultButton();
  } else {
    renderDucks();
  }
  saveLocalStorageData();
}

function setupListeners() {
  DuckContainer.addEventListener("click", handleClick);
  Button.addEventListener("click", renderResults);
}
function removeListener() {
  DuckContainer.removeEventListener("click", handleClick);
}

initializeApp();
