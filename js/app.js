'use strict';

var picLeft = document.getElementById('pic-left');
var picCenter = document.getElementById('pic-center');
var picRight = document.getElementById('pic-right');

var allPics = [];
var totalTimesChosen = 0;

var previousRandom = [];

// Constructor function
function Pic(name) {
  this.name = name;
  this.timesChosen = 0;
  this.timesShown = 0;
  this.path =`img/${name}.jpg`;
  allPics.push(this);
}

var allPicNames = ['r2d2-bag', 'banana-slicer', 'ipad-tp-roll', 'open-toed-boots', 'breakfast-maker', 'meatball-bubblegum', 'round-chair', 'cthulhu-figure', 'dog-ducklips', 'dragon-meat', 'utensil-pen', 'pet-sweep', 'pizza-scissors', 'shark-bag', 'kid-sweeper', 'tauntaun-bag', 'unicorn-meat', 'tentacle-usb', 'reverse-water-can', 'wine-glass'];

allPicNames.forEach(function(picName) {
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

getRandomNumber();
console.table(randomNumberArray);



// Function to show a random picture in each field
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

showRandomPic();

// Image selection event handling
var picSelectionEl = document.getElementById('pictures');
picSelectionEl.addEventListener('click', handlePicClick);

// Event handling function and final list output
function handlePicClick(event) {
  var clickedPic = event.target.alt;
  console.log(clickedPic);
  for (var i = 0; i < allPics.length;i++) {
    if (clickedPic === allPics[i].name) {
      allPics[i].timesChosen++;
      console.log(`The ${allPics[i].name} has been selected ${allPics[i].timesChosen} times`);
    }
  }
  getRandomNumber();
  showRandomPic();
  totalTimesChosen++;
  if (totalTimesChosen === 25) {
    alert('Thank you for providing your input! Your votes have been counted and forward to our marketing department for analysis. Please step away from the machine and proceed to the exit. Have a great day!');
    document.getElementById('pictures').innerHTML = '';
    console.table(allPics);
    picSelectionEl.removeEventListener('click', handlePicClick);
    for (var j = 0; j < allPics.length; j++) {
      var paraEl = document.createElement('p');
      var textEl = document.createTextNode (`${allPics[j].name} was clicked ${allPics[j].timesChosen} times, and was shown ${allPics[j].timesShown} times`);
      paraEl.appendChild(textEl);
      var divEl = document.getElementById('final-list');
      divEl.appendChild(paraEl);
    }
  }
}