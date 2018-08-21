'use strict';

var picLeft = document.getElementById('pic-left');
var picCenter = document.getElementById('pic-center');
var picRight = document.getElementById('pic-right');

var allPics = [];

var previousRandom = [];

function Pic(name) {
  this.name = name;
  this.timesChosen = 0;
  this.path =`img/${name}.jpg`;
  allPics.push(this);
}

var allPicNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

allPicNames.forEach(function(picName) {
  new Pic(picName);
});

console.table(allPicNames);

// Holding Array for three random numbers
var randomNumberArray = [];

// Create three random numbers
function getRandomNumber() {
  previousRandom = randomNumberArray;
  randomNumberArray = [];
  while (randomNumberArray.length < 3) {
    var randomNumber = Math.floor(allPics.length * Math.random());
    if (randomNumberArray.indexOf(randomNumber) === -1 && previousRandom.indexOf(randomNumber) === -1) {
      randomNumberArray.push(randomNumber);
    }
  }
  console.log('Previous ', previousRandom);
  console.log('Current ', randomNumberArray);
}

getRandomNumber();
console.table(randomNumberArray);

// Function to show a random picture in each field
function showRandomPic() {
  console.log('testing ', allPics.path);
  picLeft.src = allPics[randomNumberArray[0]].path;
  picLeft.title = allPics[randomNumberArray[0]].name;
  picCenter.src = allPics[randomNumberArray[1]].path;
  picCenter.title = allPics[randomNumberArray[1]].name;
  picRight.src = allPics[randomNumberArray[2]].path;
  picRight.title = allPics[randomNumberArray[2]].name;
}

showRandomPic();

// Image selection event handling
