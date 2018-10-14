/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976

const cards=document.getElementsByClassName('card');
const cardArray= new Array(cards.length);
const newDeck= document.querySelector('.deck');
const gameOverDisplay= document.querySelector('.content');
const ContainerElement= document.querySelector('.container');
const starlets=document.getElementsByClassName('fa');
gameOverDisplay.style.display='none'; // hide gameOver html

let gameOverCount=0; // check to see if all cards are displayed
let moveCounter=0; //store the move counter
let starCounter=3;// initialise starcounter to 3 to increase all stars
let startTime=0; // for storing the time game starts
let endTime=0; // for storing the time it took to complete the game


//store all the cards in the card array
for (let i=0; i<cardArray.length; i++){
    cardArray[i]=cards[i];
    }

// shuffle the cards and display the cards without their symbols
displayDeck();

// add event listener to restart icon to cause game to begin from the begining
let restart= document.querySelector('.restart');
restart.addEventListener('click', displayDeck);

// change the css property to hide the card symbol
function clear(){
    for (let i=0; i<cards.length; i++){
        cards[i].className= 'card';
      }
}

// shuffle the cards and display the cards without their symbols
var x;
function displayDeck(){
    clear();
    x=shuffle(cardArray);
    for (let i=0; i<x.length; i++){
        newDeck.appendChild(x[i]);
        x[i].addEventListener('click', showCard);
    }
    moveCounter=0;
    starCounter=3;
    gameOverCount=0;
    cardCount=0;
    startTime= performance.now();// time game started
    updateStars(starCounter);
    movesNumber(moveCounter);
}

var clickedElement; // stores clicked cards
var clickable=true;// determine if the card can be clicked or not. false, if two cards are being matched

// function to add class 'show' to clicked card class in order to display the symbol
function showCard(){
    // if the card can be clicked
    if (clickable){
        clickedElement=this;
        clickedElement.className= clickedElement.className+' show open';
        clickedElement.removeEventListener('click', showCard);// disable click listener
          openCards(clickedElement);
        }
        else{
          return;// exit the function if card should not be clicked
            }

}

// Array to store open cards temporarily
var openCardsArray=new Array(2);
var cardCount;// count the number of open cards

// function that checks if the open cards match
function openCards(element){
    openCards[cardCount]=element;
    cardCount++;

    //compare both cards
    if(cardCount>1){
        // if cards match? change the css property and display
        clickable=false;// prevent other cards from being clicked until matching is over
        if(openCards[0].innerHTML==openCards[1].innerHTML){
            openCards[0].className=openCards[0].className+' match';
            openCards[1].className=openCards[1].className+' match';

            moveCounter++;// increase moveCounter

            // send moveCounter to counterIncrease function
            movesNumber(moveCounter);
            cardCount=0;

            // increase gameOverCount and check to see if the game is over
            gameOverCount++;

            starCheck();

            if (gameOverCount== 8){
              // display game over page
              endTime= performance.now();
              winPage();

            }
            clickable=true;// allow cards to clicked

          }

          /* if the cards dont match change the css properties to hide their symbols
          and add click event listener */
        else{
            openCards[0].className='card wrong';
            openCards[1].className='card wrong';
            setTimeout(closeCard,400);

            openCards[0].addEventListener('click', showCard);
            openCards[1].addEventListener('click', showCard);
            moveCounter++;
            starCheck();// update the stars on the html
            movesNumber(moveCounter);
            cardCount=0;
          }

      }


}

// function to increase the move counter
function closeCard(){
  openCards[0].className='card';
  openCards[1].className='card';
  clickable=true;
}

  // update html to diplay the number of moves
function movesNumber(moveCounter){
    let movesElement= document.querySelector('.moves');
    movesElement.innerText=moveCounter;
}

//update the stars css property to indicate number of stars on html page
function updateStars(starCounter){
    if (starCounter==1){
      starlets[0].className='fa fa-star-o';
      starlets[1].className='fa fa-star';
      starlets[2].className='fa fa-star';
    }
    else if (starCounter==2) {
      starlets[0].className='fa fa-star-o';
      starlets[1].className='fa fa-star-o';
      starlets[2].className='fa fa-star';
    }
    else if (starCounter==3) {
      starlets[0].className='fa fa-star-o';
      starlets[1].className='fa fa-star-o';
      starlets[2].className='fa fa-star-o';
    }
    else{
      starlets[0].className='fa fa-star';
      starlets[1].className='fa fa-star';
      starlets[2].className='fa fa-star';
    }
}

// function to set the number of stars
function starCheck(){
    if (moveCounter<=8){
        starCounter=3;
      }
    else if(moveCounter<=(2*gameOverCount)){
            starCounter=2;
          }
    else if(moveCounter<=(3*gameOverCount)){
          starCounter=1;
        }
    else{
        starCounter=0;
      }
    updateStars(starCounter); //update stars on html
}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// function to display gameover html and hide card deck
function winPage(){
    const bodyNode= document.querySelector('body');
    ContainerElement.style.display="none";// hide deck html
    bodyNode.style.background='white';
    gameOverDisplay.style.display='flex';// display gameover html
    document.querySelector('.getMoves').innerText=moveCounter;// update score
    document.querySelector('.starCount').innerText=starCounter;// update score
    const timer= (endTime-startTime)/1000; // calculate the time taken
    document.querySelector('.getTime').innerText=parseInt(timer,10); //update the timer
}

let replay2= document.querySelector('.replay');
replay2.addEventListener('click',startAllOver);

// function to display a reshuflled card deck and hide the gameOver html
function startAllOver(){
      ContainerElement.style.display="flex";
      gameOverDisplay.style.display='none';
      displayDeck();
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
