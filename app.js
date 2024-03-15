"use strict";

let productsArr = [];
let votingRounds = 25;

//Creating a constructor function
function Product(name) {
  this.name = name;
  this.img = `imgs/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  productsArr.push(this);
}

//Adding products
// let bagProduct = new Product("bag");
// let bananaProduct = new Product("banana");
// let bathroomProduct = new Product("bathroom");
// let bootsProduct = new Product("boots");
// let breakfastProduct = new Product("breakfast");
// let bubblegumProduct = new Product("bubblegum");
// let chairProduct = new Product("chair");
// let cthulhuProduct = new Product("cthulhu");
// let dogDuckProduct = new Product("dog-duck");
// let dragonProduct = new Product("dragon");
// let penProduct = new Product("pen");
// let petSweepProduct = new Product("pet-sweep");
// let scissorsProduct = new Product("scissors");
// let sharkProduct = new Product("shark");
// let sweepProduct = new Product("sweep");
// let tauntaunProduct = new Product("tauntaun");
// let unicornProduct = new Product("unicorn");
// let waterCanProduct = new Product("water-can");
// let wineGlassProduct = new Product("wine-glass");

//Callings
let imgsDisplay = document.getElementById("imgsDisplay");

let img1 = document.getElementById("img1");
let img2 = document.getElementById("img2");
let img3 = document.getElementById("img3");

let resultsButton = document.getElementById("resultsButton");
let resultsList = document.getElementById("resultsList");

//Creating random index function
function randomIndex() {
  return Math.floor(Math.random() * productsArr.length);
}

//Rendering imgs
let usedSet = new Set();

function renderImgs() {
  let currentSet = new Set();
  //   console.log(usedSet);
  //   console.log(currentSet);

  let randInd1 = randomIndex();
  while (usedSet.has(randInd1)) {
    randInd1 = randomIndex();
  }
  currentSet.add(randInd1);

  let randInd2 = randomIndex();
  while (usedSet.has(randInd2) || randInd2 === randInd1) {
    randInd2 = randomIndex();
  }
  currentSet.add(randInd2);

  let randInd3 = randomIndex();
  while (
    usedSet.has(randInd3) ||
    randInd3 === randInd2 ||
    randInd3 === randInd1
  ) {
    randInd3 = randomIndex();
  }
  currentSet.add(randInd3);

  usedSet = currentSet;

  //   while (
  //     randInd1 === randInd2 ||
  //     randInd1 === randInd3 ||
  //     randInd2 === randInd3
  //   ) {
  //     randInd2 = randomIndex();
  //     randInd3 = randomIndex();
  //   }

  img1.src = productsArr[randInd1].img;
  img2.src = productsArr[randInd2].img;
  img3.src = productsArr[randInd3].img;

  img1.title = productsArr[randInd1].name;
  img2.title = productsArr[randInd2].name;
  img3.title = productsArr[randInd3].name;

  productsArr[randInd1].views++;
  productsArr[randInd2].views++;
  productsArr[randInd3].views++;
}

// console.log(productsArr);

//Eventlistener
imgsDisplay.addEventListener("click", handleClick);

function handleClick(event) {
  let clicked = event.target.title;
  for (let i = 0; i < productsArr.length; i++) {
    if (clicked === productsArr[i].name) {
      productsArr[i].votes++;
    }
  }

  votingRounds--;

  renderImgs();

  if (votingRounds === 0) {
    imgsDisplay.removeEventListener("click", handleClick);

    let stringifiedProducts = JSON.stringify(productsArr);
    localStorage.setItem("products", stringifiedProducts);
  }
}

//Button Eventlistner
resultsButton.addEventListener("click", showResults);

function showResults() {
  if (votingRounds === 0) {
    for (let i = 0; i < productsArr.length; i++) {
      let liEl = document.createElement("li");
      liEl.textContent = `${productsArr[i].name} had ${productsArr[i].votes} votes, and was seen ${productsArr[i].views} times.`;
      resultsList.appendChild(liEl);
    }
    showChart();
  }
}

//Chart
function showChart() {
  let productNames = [];
  let productVotes = [];
  let productViews = [];

  for (let i = 0; i < productsArr.length; i++) {
    productNames.push(productsArr[i].name);
    productVotes.push(productsArr[i].votes);
    productViews.push(productsArr[i].views);
  }

  const ctx = document.getElementById("canvasChart");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: productNames,
      datasets: [
        {
          label: `Votes`,
          data: productVotes,
          borderWidth: 1,
          backgroundColor: "red",
        },
        {
          label: `Views`,
          data: productViews,
          borderWidth: 1,
          backgroundColor: "blue",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

//LocalStorage
let retrievedProducts = localStorage.getItem("products");

let parsedProducts = JSON.parse(retrievedProducts);

if (retrievedProducts) {
  productsArr = parsedProducts;
} else {
  let bagProduct = new Product("bag");
  let bananaProduct = new Product("banana");
  let bathroomProduct = new Product("bathroom");
  let bootsProduct = new Product("boots");
  let breakfastProduct = new Product("breakfast");
  let bubblegumProduct = new Product("bubblegum");
  let chairProduct = new Product("chair");
  let cthulhuProduct = new Product("cthulhu");
  let dogDuckProduct = new Product("dog-duck");
  let dragonProduct = new Product("dragon");
  let penProduct = new Product("pen");
  let petSweepProduct = new Product("pet-sweep");
  let scissorsProduct = new Product("scissors");
  let sharkProduct = new Product("shark");
  let sweepProduct = new Product("sweep");
  let tauntaunProduct = new Product("tauntaun");
  let unicornProduct = new Product("unicorn");
  let waterCanProduct = new Product("water-can");
  let wineGlassProduct = new Product("wine-glass");
}

//Start
renderImgs();
