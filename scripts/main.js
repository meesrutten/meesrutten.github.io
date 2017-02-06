var sendForm = document.querySelector('#chatform'),
    textInput = document.querySelector('.chatbox'),
    chatList = document.querySelector('.chatlist'),
    userBubble = document.querySelectorAll('.userInput'),
    botBubble = document.querySelectorAll('.bot__output'),
    animateBotBubble = document.querySelectorAll('.bot__input--animation'),
    overview = document.querySelector('.chatbot__overview'),
    hasCorrectInput,
    imgLoader = false,
    animationCounter = 1,
    animationBubbleDelay = 600,
    input,
    previousInput,
    isReaction = false,
    unkwnCommReaction = "I didn't quite get that.";

//fixed that when you scroll to end it doesnt scroll window
// chatList.addEventListener('mouseover', function(){
//   document.body.style.overflow='hidden';
// })
//
// chatList.addEventListener('mouseout', function(){
//   document.body.style.overflow='auto';
//   document.body.style.overflowX='hidden';
// })

sendForm.onkeydown = function(e){
  if(e.keyCode == 13){
    e.preventDefault();

    //No mix ups with upper and lowercases
    var input = textInput.value.toLowerCase();

    //Empty textarea fix
    if(input.length > 0) {
      createBubble(input)
    }
  }
};

sendForm.addEventListener('submit', function(e) {
  //so form doesnt submit page (no page refresh)
  e.preventDefault();

  //No mix ups with upper and lowercases
  var input = textInput.value.toLowerCase();

  //Empty textarea fix
  if(input.length > 0) {
    createBubble(input)
  }
}) //end of eventlistener

var createBubble = function(input) {
  //create input bubble
  var chatBubble = document.createElement('li');
  chatBubble.classList.add('userInput');

  //adds input of textarea to chatbubble list item
  chatBubble.innerHTML = input;
  console.log('input = '+input);

  //adds chatBubble to chatlist
  chatList.appendChild(chatBubble)

  checkInput(input);
}

var checkInput = function(input) {

  hasCorrectInput = false;
  isReaction = false;
  //Checks all text values in possibleInput

  for(var textVal in possibleInput){
    // if(input.includes(textVal) == true){
    //   console.log("include succes");
    // }
    //If user reacts with "yes" and the previous input was in textVal
    if(input == "yes" || input.indexOf("yes") >= 0){
      if(previousInput == textVal) {
        console.log("sausigheid");

        isReaction = true;
        hasCorrectInput = true;
        botResponse(textVal);
      }
    }
    if(input == "no" && previousInput == textVal){
      unkwnCommReaction = "For a list of commands type: Commands";
      unknownCommand("I'm sorry to hear that :(")
      unknownCommand(unkwnCommReaction);
      hasCorrectInput = true;
    }

    //Is a word of the input also in possibleInput object?
    if(input == textVal || input.indexOf(textVal) >=0 && isReaction == false){
			console.log("succes");
      hasCorrectInput = true;
      botResponse(textVal);
		}
	}
  //When input is not in possibleInput
  if(hasCorrectInput == false){
    console.log("failed");
    unknownCommand(unkwnCommReaction);
    hasCorrectInput = true;
  }
}

// debugger;

function botResponse(textVal) {
  //sets previous input to that what was called
  // previousInput = input;

  //create response bubble
  var userBubble = document.createElement('li');
  userBubble.classList.add('bot__output');

  console.log(isReaction);
  console.log("previnp= "+previousInput);
  console.log("texval= "+textVal);
  // console.log("botResponse "+previousInput);
  // console.log("functionrepsonse "+reactionInput[textVal]());
  if(isReaction == true){
    if (typeof reactionInput[textVal] === "function") {
      // console.log(possibleInput[textVal] +" is a function");
    //adds input of textarea to chatbubble list item
      userBubble.innerHTML = reactionInput[textVal]();
    } else {
      userBubble.innerHTML = reactionInput[textVal];
    }
  }

  if(isReaction == false){
    //Is the command a function?
    if (typeof possibleInput[textVal] === "function") {
      // console.log(possibleInput[textVal] +" is a function");
    //adds input of textarea to chatbubble list item
      userBubble.innerHTML = possibleInput[textVal]();
    } else {
      userBubble.innerHTML = possibleInput[textVal];
    }
  }
  //add list item to chatlist
  chatList.appendChild(userBubble) //adds chatBubble to chatlist

  // reset text area input
  textInput.value = "";
}

function unknownCommand(unkwnCommReaction) {
  // animationCounter = 1;

  //create response bubble
  var failedResponse = document.createElement('li');

  failedResponse.classList.add('bot__output');
  failedResponse.classList.add('bot__output--failed');

  //Add text to failedResponse
  failedResponse.innerHTML = unkwnCommReaction; //adds input of textarea to chatbubble list item

  //add list item to chatlist
  chatList.appendChild(failedResponse) //adds chatBubble to chatlist

  animateBotOutput();

  // reset text area input
  textInput.value = "";

  //Sets chatlist scroll to bottom
  chatList.scrollTop = chatList.scrollHeight;

  animationCounter = 1;
}

function responseText(e) {

  var response = document.createElement('li');

  response.classList.add('bot__output');

  //Adds whatever is given to responseText() to response bubble
  response.innerHTML = e;

  chatList.appendChild(response);

  animateBotOutput();

  console.log(response.clientHeight);

  //Sets chatlist scroll to bottom
  setTimeout(function(){
    chatList.scrollTop = chatList.scrollHeight;
  //   // chatList.scrollTop = chatList.scrollTop + response.clientHeight;
  //   // console.log(chatList.scrollTop = chatList.scrollTop + response.clientHeight);
    console.log(response.clientHeight);
  }, 0)
}

// function scrollDown(response) {
//     console.log(response.clientHeight);
//     chatList.scrollTop = chatList.scrollTop + response.clientHeight;
// }

function responseImg(e) {
  var image = new Image();

  image.classList.add('bot__output');
  //Custom class for styling
  image.classList.add('bot__outputImage');
  //Gets the image
  image.src = "/images/"+e;
  chatList.appendChild(image);

  animateBotOutput()
  if(image.completed) {
    console.log(image.scrollHeight);
    // chatList.scrollTop = chatList.scrollHeight;
    chatList.scrollTop = chatList.scrollTop + image.scrollHeight;
  }
  else {
    image.addEventListener('load', function(){
      console.log(image.scrollHeight);
      chatList.scrollTop = chatList.scrollTop + image.scrollHeight;
    })
  }
  //Load image so height gets checked after chatlist add

}



// animateStandardBotOutput();

//change to SCSS loop
// function animateStandardBotOutput(){
//   var botBubble = document.querySelectorAll('.bot__output--standard')
//   for (var i = 0; i < botBubble.length; i++) {
//     botBubble[i].style.animationDelay = (i * animationBubbleDelay)+"ms";
//     botBubble[i].style.animationPlayState = "running"
//   }
// }

//change to SCSS loop
function animateBotOutput() {
  // chatList.scrollTop = chatList.scrollTop + response.scrollHeight;
  chatList.lastElementChild.style.animationDelay= (animationCounter * animationBubbleDelay)+"ms";
  animationCounter++;
  chatList.lastElementChild.style.animationPlayState = "running";
}

function commandReset(e){
  animationCounter = 1;
  previousInput = Object.keys(possibleInput)[e];

  console.log(previousInput);
}

var possibleInput = {
  "help" : function(){
    responseText("You can type a command in the chatbox")
    responseText("Something like &quot;Navvy, please show me Mees&rsquo; best work&quot;")
    responseText("Did you find a bug or problem? Tweet me @MeesRu")
    // responseText("Do you need more help? (Yes/No)")
    commandReset(0);
    return
    },
  "best work" : function(){
    responseText("I will show you Mees' best work!");
    responseText("These are his <a href='#animation'>best animations</a>")
    responseText("These are his <a href='#projects'>best projects</a>")
    responseText("Would you like to see how I was built? (Yes/No)")

    commandReset(1);
    return
    },
  "about" : function(){
    responseText("This is me, Navvy's maker, Mees Rutten");
    responseImg("rsz_meesface.jpg");
    responseText("I'm a 20 year old Communication and Multimedia Design student");
    responseText("My ambition is to become a great Creative Front-End Developer");
    responseText("Would you like to know about Mees' vision? (Yes/No)");
    commandReset(2);
    return
    },
  "experience" : function(){
    responseText("Mees has previously worked at:");
    responseText("Cobra Systems as web- developer / designer");
    responseText("BIT Students as web- developer / designer");
    responseText("Would you like to see Mees' CV? (Yes/No)");
    commandReset(3);
    return
  },
  "hobbies" : function(){
    responseText("Mees loves:");
    responseText("Coding complicated chatbots");
    responseText("Family time");
    responseText("Going out with friends");
    responseText("Working out");
    commandReset(4);
    return
  },
  "interests" : function(){
    responseText("Mees loves:");
    responseText("Coding complicated chatbots");
    responseText("Family time");
    responseText("Going out with friends");
    responseText("Working out");
    commandReset(5);
    return
  },
  "cv" : function(){
    responseText("I will redirect you to Mees' CV");
    setTimeout(function(){
      window.location.href = "/images/CV-MeesRutten-2017-februari.png"; }, 3000);
    commandReset(6);
    return
  },
  "vision" : function(){
    responseText("Things I want to learn or do:");
    responseText("Get great at CSS & JS animation");
    responseText("Create 3D browser experiences");
    responseText("Learn Three.js and WebGL");
    responseText("Combine Motion Design with Front-End");
    commandReset(7);
    return
  },
  "contact" : function(){
    responseText("email: <a href='mailto:meesrutten@gmail.com?Subject=Hello%20Mees' target='_top'>send me a message</a>");
    responseText("Twitter: <a href='https://twitter.com/meesrttn'>@MeesRttn</a>");
    commandReset(8);
    return
  },
  "commands" : function(){
    responseText("This is a list of commands Navvy knows:")
    responseText("help, best work, about, vision, experience, CV, hobbies / interests, contact, rick roll");
    commandReset(9);
    return
  },
  "rick roll" : function(){
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
  // work experience
}

var reactionInput = {
  "best work" : function(){
    //Redirects you to a different page after 3 secs
    responseText("On this GitHub page you'll find everything about Navvy");
    responseText("<a href='https://github.com/meesrutten/chatbot'>Navvy on GitHub</a>")
    animationCounter = 1;
    return
  },
  "help" : function(){
    responseText("Reaction");
    animationCounter = 1;
    return
    },
  "about" : function(){
    responseText("Things I want to learn or do:");
    responseText("Get great at CSS & JS animation");
    responseText("Create 3D browser experiences");
    responseText("Learn Three.js and WebGL");
    responseText("Combine Motion Design with Front-End");
    animationCounter = 1;
    return
    },
  "experience" : function(){
    responseText("I will redirect you to Mees' CV");
    setTimeout(function(){
      window.location.href = "/images/CV-MeesRutten-2017-februari.png"; }, 3000);
    animationCounter = 1;
    return
  }
}

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
var mq = window.matchMedia( "(max-width: 48em)" );
if (mq.matches) {
  // window width is not 48em
  let cardOverlaySlider = document.querySelectorAll('.card__button')
  let cardOverlay = document.querySelectorAll('.card__excerpt--underlay')
  let cardOverlayText = document.querySelectorAll('.card__excerpt')

  for (var i = 0; i < cardOverlaySlider.length; i++) {
    cardOverlaySlider[i].setAttribute('aria-expanded', 'false')

    cardOverlaySlider[i].addEventListener('click', function(e){
      e.preventDefault()
      // this.classList.toggle('card__button--open')


      let expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded))
      // cardOverlay[i].hidden = expanded;
      this.nextSibling.nextSibling.hidden = expanded;
    })
  }
}

setInterval(function(){
  localStorage.setItem("scrollTop", document.body.scrollTop);
},300)
// then getting same position from it onload(reload)
window.onload = function() {
  var scroll = parseInt(localStorage.getItem("scrollTop"));
  //parseInt(localStorage.scrollTop);
  if (!isNaN(scroll))
    document.body.scrollTop = scroll;
  }



//
// // WCAG-compliant navigation toggling
// (function navigationToggling() {
//   const navigationSelect = document.querySelector('.navigation');
//   const navigationToggle = document.querySelector('.header__menu--button');
//
//   navigationToggle.addEventListener('click', toggleNavigation);
//
//   // navigationToggle.setAttribute('aria-expanded', 'false');
//
//   function toggleNavigation() {
//     let expanded = this.getAttribute('aria-expanded') === 'true';
//     this.setAttribute('aria-expanded', String(!expanded));
//     navigationSelect.hidden = expanded;
//   }
// })();
