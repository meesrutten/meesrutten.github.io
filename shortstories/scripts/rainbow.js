
////////////////
// Animatie
////////////////

var storyWrapper = document.querySelector('.story__wrapper');
var cloudSVG = document.querySelector('.cloud-svg');
var sunSVG = document.querySelector('.sun-svg');
var rainbowSVG = document.querySelector('.rainbow-svg')
// var overlayReveal = document.querySelector('.overlay__reveal')

storyWrapper.addEventListener('scroll', function(e) {
  // last_known_scroll_position = window.scrollY;
  // console.log(last_known_scroll_position);
  console.log(storyWrapper.scrollTop);
  console.log(sunSVG.style.right);
  // console.log(overlayReveal.style.height);
  // sunSVG.style.right = storyWrapper.scrollTop + 'px';
  // sunSVG.style.right = "-125px";
  // storyWrapper.scrollTop >= 675 ? sunSVG.style.right = 525 : sunSVG.style.right = Math.floor(storyWrapper.scrollTop - 150) + 'px';

  //newest storyWrapper.scrollTop >= 750 ? sunSVG.style.right = "65vw" : sunSVG.style.right = Math.floor((storyWrapper.scrollTop - 550)/7.5) + 'vw';

  // storyWrapper.scrollTop >= 875 ? cloudSVG.style.left = 455 : cloudSVG.style.left = Math.floor(storyWrapper.scrollTop - 420) + 'px';

  // storyWrapper.scrollTop >= 950 ? cloudSVG.style.left = "60vw" : cloudSVG.style.left = Math.floor((storyWrapper.scrollTop - 520)/7.5) + 'vw';

  // console.log(sunSVG.style.right.value);
  // storyWrapper.scrollTop >= 2700 ? overlayReveal.style.height = "0" : overlayReveal.style.height = ((-storyWrapper.scrollTop / 30) + 91) + "%"
  // media query event handler
  //bron :https://www.sitepoint.com/javascript-media-queries/

  if (matchMedia) {
    var mq = window.matchMedia("(min-width: 40.5em)");
    mq.addListener(WidthChange);
    WidthChange(mq);
  }

  // media query change
  function WidthChange(mq) {
    if (mq.matches) {
      storyWrapper.scrollTop >= 1600 ? sunSVG.style.right = "calc(50vw - 75px)" : sunSVG.style.right = Math.floor((storyWrapper.scrollTop - 1250)/10) + 'vw';
      sunSVG.style.right == "calc(50vw - 75px)" ? (rainbowSVG.classList.add('rainbow-animate'), setTimeout(function(){ rainbowSVG.style.opacity = "1" }, 6000) ): rainbowSVG.classList.remove('rainbow-animate');
    } else {
      storyWrapper.scrollTop >= 2500 ? sunSVG.style.right = "50vw" : sunSVG.style.right = Math.floor((storyWrapper.scrollTop - 1900)/12.5) + 'vw';
      // storyWrapper.scrollTop >= 2750 ? rainbowSVG.style.opacity = "1" : rainbowSVG.style.opacity += storyWrapper.scrolltop / 100;
      sunSVG.style.right == "50vw" ? (rainbowSVG.classList.add('rainbow-animate'), setTimeout(function(){ rainbowSVG.style.opacity = "1" }, 6000) ): rainbowSVG.classList.remove('rainbow-animate');
    }
  }
});

// sunSVG.style.right == "calc(50vw - 75px)" || "calc(50vw)" ? rainbowSVG.style.visibility = "visible" : rainbowSVG.style.visibility = "hidden";


// number of drops created.
var nbDrop = 128;

// function to generate a random number range.
function randRange( minNum, maxNum) {
  return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}

// function to generate drops
function createRain() {

	for( i=1;i<nbDrop;i++) {
	var dropLeft = randRange(0,1600);
	var dropTop = randRange(-1000,1400);

	$('.rain').append('<div class="drop" id="drop'+i+'"></div>');
	$('#drop'+i).css('left',dropLeft);
	$('#drop'+i).css('top',dropTop);
	}

}
// Make it rain
createRain();
