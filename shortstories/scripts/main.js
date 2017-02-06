var currentHour = new Date().getHours();
var mainElement = document.querySelector('main');
var searchButton = document.querySelector('.header__button--search');
var header = document.querySelector('.header');
var searchField = document.querySelector('.search__field')
var excerptStoned = document.querySelector('.excerpt__leader--stoned');

// currentHour = 6;
// currentHour = 22;

console.log("Current hour of day: " + currentHour);

//Nightmode
currentHour > 5 && currentHour < 21 ? document.body.classList.remove('nightmode') : document.body.classList.add('nightmode')

//enable search
searchButton.addEventListener('click', function() {
  header.classList.toggle('searching');
})

//When you click the main element while searchbar is shown, searchbar will hide
mainElement.addEventListener('mouseup', function(event){
  if(event.target !=searchField && event.target.parentNode !=searchField){
   header.classList.remove('searching');
  }
})


setInterval(function(){

  var offsetY = Math.floor((Math.random() * 2) + 1);
  var blurSpread = Math.floor((Math.random() * 2) + 1);

  var myArray = [-4, -5, -6, 6, 5, 4]
  var offsetX = myArray[Math.floor(Math.random() * myArray.length)];

  var colors = [000, 111, 222, 333 ,444 ,555, 666]
  var randomColor = colors[Math.floor(Math.random() * colors.length)];
  excerptStoned.style.color = "#"+ randomColor;

  var dropshadowColor = [888, 999, "f9f9f9", "fff", "eee"]
  var randomColor2 = dropshadowColor[Math.floor(Math.random() * dropshadowColor.length)];
  excerptStoned.style.webkitFilter = "drop-shadow(" + offsetX + "px " + offsetY + "px " + blurSpread + "px #" + randomColor2 +")";

}, 1000);



//
// let periodButton = document.querySelector('label[for="period-button"]');
// let checkBox = document.querySelectorAll('#sort-button__dropdown input');
//
//
// for (var i = 0; i < checkBox.length; i++) {
//   checkBox[i].addEventListener('click', function(){
//     if (this.checked) {
//       periodButton.appendChild('span.caret')
//       periodButton.innerHTML = this.value;
//     }
//   })
// }
