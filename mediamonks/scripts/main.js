var nextButton = document.querySelector('.next__button'),
    prevButton = document.querySelector('.prev__button'),
    imageHolder = document.querySelector('.background__container'),
    bigTextQuotes = document.querySelectorAll('.text__quote--big'),
    progress = document.querySelector('.progress')

// i takes care of page numbers, and the translateX value of the background image
var i = 0

var scrollValue = []

//Mediaquery with the translateX values of background image
var mq = window.matchMedia( "(max-width: 48em)" );
if (mq.matches) {
  scrollValue = [1, 12, 15.75, 20, 28, 35, 47.5, 58, 61.75, ]
} else {
  scrollValue = [0, 6.5, 12, 19, 26, 33.5, 41, 49.5, 51, 57.5]
}

//Caret buttons
nextButton.addEventListener('click', scrollToNextQuote)
prevButton.addEventListener('click', scrollToPrevQuote)

console.log(i);

//Shows first quote
bigTextQuotes[0].style.opacity = 1
//Hides caret buttons when theyre not usable
i == 0 ? prevButton.style.display = "none" : prevButton.style.display = "block"

function scrollToNextQuote() {
  //hides previous quote
  bigTextQuotes[i].style.opacity = 0
  //is i bigger or equal to 9? then i = 9 else i += 1
  i >= 9 ? i = 9 : i++
  console.log("i="+i)
  //calls forScroll function
  forScroll(i)
}
function scrollToPrevQuote() {
  bigTextQuotes[i].style.opacity = 0
  //is i smaller or equal to 0? then i = 0 else i -= 1
  i <= 0 ? i = 0 : i--
  console.log("i="+i)
  forScroll(i)
}

function forScroll() {
  //Slides the background image
  imageHolder.style.transform = 'translateX(-'+scrollValue[i]+'%)'
  //Makes the appropriate quote visible
  bigTextQuotes[i].style.opacity = 1
  //Progress
  progress.innerHTML = i + ' / 9'
  //hides caret buttons when theyre not needed
  i == 0 ? prevButton.style.display = "none" : prevButton.style.display = "block"
  i == 9 ? nextButton.style.display = "none" : nextButton.style.display = "block"
}










// function scrollToNextQuote() {
//   console.log("step 1")
//   // bigTextQuotes.scrollIntoView({block: "start", behavior: "smooth"})
//   // element.scrollIntoView({block: "end", behavior: "smooth"})
//   scrollTo(document.body, scrollToNextQuoteValues[i], 1000)
//   console.log("step 2")
//   // bigTextQuotes[i].style.opacity = 1
//
//   i <= 9 ? i++ : i = 9
//   console.log("i="+i)
// }
//
// function scrollToPrevQuote() {
//   console.log("step 1")
//   // bigTextQuotes.scrollIntoView({block: "start", behavior: "smooth"})
//   // element.scrollIntoView({block: "end", behavior: "smooth"})
//   scrollTo(document.body, scrollToPrevQuoteValues[i], 1000)
//   console.log("step 2")
//   // bigTextQuotes[i].style.opacity = 1
//
//   i <= 0 ? i = 0 : i--
//   console.log("i="+i)
// }
//
// function scrollTo(element, scrollValue, duration) {
//   if (duration <= 0) return
//   var difference = scrollValue - element.scrollLeft
//   var perTick = difference / duration * 10
//
//   console.log("step 3")
//
//   if (element == document.body) {
//     setTimeout(function(){
//       element.scrollLeft = element.scrollLeft + perTick
//       if (element.scrollLeft == scrollValue) return
//       scrollTo(element, scrollValue, duration - 10)
//     }, 10)
//   }
//   else {
//     return
//   }
// }
//
//
//
//
//
// var scrollToNextQuoteValues = [1000, 500, 500, 500, 500, 500, 500]
// var scrollToPrevQuoteValues = [1000, 500, 500, -500, -500, -500]
//
// // function runScroll() {
// //   scrollTo(document.body, 0, 600)
// // }
// // var scrollme
// // scrollme = document.querySelector("#scrollme")
// // scrollme.addEventListener("click",runScroll,false)
// //
// // function scrollTo(element, to, duration) {
// //   if (duration <= 0) return
// //   var difference = to - element.scrollTop
// //   var perTick = difference / duration * 10
// //
// //   setTimeout(function() {
// //     element.scrollTop = element.scrollTop + perTick
// //     if (element.scrollTop == to) return
// //     scrollTo(element, to, duration - 10)
// //   }, 10)
// // }
