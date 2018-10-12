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
let starCounter=0;


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
function displayDeck(){
    clear();
    let x=shuffle(cardArray);
    for (let i=0; i<x.length; i++){
        newDeck.appendChild(x[i]);
        x[i].addEventListener('click', showCard);
        moveCounter=0;
        starCounter=0;
        gameOverCount=0;
        updateStars(starCounter);
        movesNumber(moveCounter);
    }
}

var clickedElement; // stores clicked cards

// function to add class 'show' to clicked card class in order to display the symbol
function showCard(){
    clickedElement=this;
    clickedElement.className= clickedElement.className+' show open';
    clickedElement.removeEventListener('click', showCard);// disable click listener

    // display second card for 400 miliseconds before calling
    if (cardCount==1){
        setTimeout(function(){openCards(clickedElement);}, 100);
    }
    else{openCards(clickedElement);}
}

// Array to store open cards temporarily
let openCardsArray=new Array(2);
let cardCount=0;// count the number of open cards

// function that checks if the open cards match
function openCards(element){
    openCards[cardCount]=element;
    cardCount++;

    //compare both cards
    if(cardCount>1){
        // if cards match? change the css property and display
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
              winPage();
            }
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
            starCheck();
            movesNumber(moveCounter);
            cardCount=0;
          }
      }
}

// function to increase the move counter
function closeCard(){
  openCards[0].className='card';
  openCards[1].className='card';
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
    if (gameOverCount==moveCounter){
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
}

let replay2= document.querySelector('.replay');
replay2.addEventListener('click',startAllOver);

// function to display a reshuflled card deck and hide the gameOver html
function startAllOver(){
//bodyNode.style.background='#ffffff url("../img/geometry2.png")' ;
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
