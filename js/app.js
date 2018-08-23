'use strict';

var picLeft = document.getElementById('pic-left');
var picCenter = document.getElementById('pic-center');
var picRight = document.getElementById('pic-right');

var allPics = [];
var totalSetsClicked = 0;

var previousRandom = [];

// Constructor function
function Pic(name) {
  this.name = name;
  this.timesChosen = 0;
  this.timesShown = 0;
  this.path = `img/${name}.jpg`;
  allPics.push(this);
}

var allPicNames = ['r2d2-bag', 'banana-slicer', 'ipad-tp-roll', 'open-toed-boots', 'breakfast-maker', 'meatball-bubblegum', 'round-chair', 'cthulhu-figure', 'dog-ducklips', 'dragon-meat', 'utensil-pen', 'pet-sweep', 'pizza-scissors', 'shark-bag', 'kid-sweeper', 'tauntaun-bag', 'unicorn-meat', 'tentacle-usb', 'reverse-water-can', 'wine-glass'];

allPicNames.forEach(function (picName) {
  new Pic(picName);
});

console.table(allPicNames);

// Holding Array for three random numbers
var randomNumberArray = [];

// Create three random numbers and append to number of times shown
function getRandomNumber() {
  previousRandom = randomNumberArray;
  randomNumberArray = [];
  while (randomNumberArray.length < 3) {
    var randomNumber = Math.floor(allPics.length * Math.random());
    if (randomNumberArray.indexOf(randomNumber) === -1 && previousRandom.indexOf(randomNumber) === -1) {
      randomNumberArray.push(randomNumber);
      allPics[randomNumber].timesShown++;
    }
  }
  console.log('Previous ', previousRandom);
  console.log('Current ', randomNumberArray);
}

// --------- CREATE LOCAL STORAGE OF VALUES -------------- //
var allStoredPics = JSON.parse(localStorage.getItem('voteCounter'));

if (localStorage.getItem('voteCounter') === null) {
  getRandomNumber();
  console.table(randomNumberArray);
  showRandomPic();
} else {
  for (var i = 0; i < allPics.length; i++) {
    allPics[i].timesChosen = allStoredPics[i];
  }
  totalSetsClicked = JSON.parse(localStorage.getItem('totalClickCount'));
  getRandomNumber();
  console.table(randomNumberArray);
  showRandomPic();
}

// Function that displays a random picture in each field
function showRandomPic() {
  picLeft.src = allPics[randomNumberArray[0]].path;
  picLeft.alt = allPics[randomNumberArray[0]].name;
  picLeft.title = allPics[randomNumberArray[0]].name;
  picCenter.src = allPics[randomNumberArray[1]].path;
  picCenter.alt = allPics[randomNumberArray[1]].name;
  picCenter.title = allPics[randomNumberArray[1]].name;
  picRight.src = allPics[randomNumberArray[2]].path;
  picRight.alt = allPics[randomNumberArray[2]].name;
  picRight.title = allPics[randomNumberArray[2]].name;
}

// Image selection event handling
var picSelectionEl = document.getElementById('pictures');
picSelectionEl.addEventListener('click', handlePicClick);

// Event handling function and final list output
function handlePicClick(event) {
  var clickedPic = event.target.alt;
  console.log(clickedPic);
  for (var i = 0; i < allPics.length; i++) {
    if (clickedPic === allPics[i].name) {
      allPics[i].timesChosen++;
      console.log(`The ${allPics[i].name} has been selected ${allPics[i].timesChosen} times`);
    }
  }

  if (totalSetsClicked > 24) {
    totalSetsClicked = 0;
  } else {
    totalSetsClicked++;
  }
  updateChartArrays();
  getRandomNumber();
  showRandomPic();
  if (totalSetsClicked === 25) {
    alert('Thank you for providing your input! Your votes have been counted and forward to our marketing department for analysis. Please step away from the machine and proceed to the exit. Have a great day!');
    document.getElementById('pictures').innerHTML = '';
    drawChart();
    console.table(allPics);
    picSelectionEl.removeEventListener('click', handlePicClick);
    // ++++ INTERNAL FOR LOOP THAT PRINTS OUT FINAL LIST +++ //
    // for (var j = 0; j < allPics.length; j++) {
    //   var paraEl = document.createElement('p');
    //   var textEl = document.createTextNode (`${allPics[j].name} | Appearances: ${allPics[j].timesShown} | Votes: ${allPics[j].timesChosen}`);
    //   paraEl.appendChild(textEl);
    //   var divEl = document.getElementById('final-list');
    //   divEl.appendChild(paraEl);
    // }
  }
}

// ------ Function to update chart arrays ------- //

var picVotes = [];
var picAppearances = [];
var picLabels = [];

function updateChartArrays() {
  for (var i = 0; i < allPics.length; i++) {
    picLabels[i] = allPics[i].name;
    picVotes[i] = allPics[i].timesChosen;
    picAppearances[i] = allPics[i].timesShown;
    localStorage.setItem('voteCounter', JSON.stringify(picVotes));
    localStorage.setItem('totalClickCount', JSON.stringify(totalSetsClicked));
    localStorage.setItem('totalAppearances', JSON.stringify(picAppearances));
  }
  console.log(picLabels);
  console.log(picVotes);
}

// ----------- Chart creation ------------- //
function drawChart() {
  var ctx = document.getElementById('busmall-chart').getContext('2d');
  Chart.defaults.global.defaultFontColor = 'white';
  new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: picLabels,
      datasets: [{
        data: picVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
    },
    scales: {
      yAxes: [{
        ticks: {
          max: 30,
          min: 0,
          stepSize: 1.0,
          beginAtZero: true
        }
      }]
    }
  });
}