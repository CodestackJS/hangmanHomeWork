//have an array of different words - data.json
//Make a counter variable to count the number of remaining turns
//variable for maximum number of turns that can be taken
//Random generator or function to grab a word from our array
//create a number of underscores equal to the length of our random word
//keep a letter bank, to show which letters the user has already tried
//counter for correct guesses, so that we know if they've won the game
//input field for user
//start button 
//replay button
//Display field for remaining/used turns
//Loop to display the letters in their corect positions when the user guesses the letter correctly
//Popup to ask if you're sure if you want to restart

let displayedWord = document.getElementById('displayedWord');
let displayedGuesses = document.getElementById('displayedGuesses');
let letterBank = document.getElementById('letterBank');
let userInput = document.getElementById('userInput');
let startBtn = document.getElementById('startBtn');
let restartBtn = document.getElementById('restartBtn');
let ansBtn = document.getElementById('ansBtn');
let selectedWord = document.getElementById('selectedWord');
let hangman = document.getElementById('hangman');

let randomWord = ""; //will become the random word  we pull from our array
let maxGuesses = 6; //max number of guesses
//this will contain an array that we will join together later
// in order to display the underscores and letter they have guessed correctly,
//in the spaces the ywould take up in a word
let letterArray = [];
let wrongGuesses = ""; //this will be the letters they have guessed
//number of guesses they have made, or turns taken, starts at zero
let guesses = 0;



// created EventListeners for each buttons 


startBtn.addEventListener('click', function(){ 
    dataCall();
})

restartBtn.addEventListener('click', function(){
    resetGame();
})

ansBtn.addEventListener('click', function(){
    easterEgg();
});

userInput.addEventListener('keydown', function(event){
    // event or "e"   is a reserved word which will run the function event and also stores the data from the function   its like a fishing net and grabs a bunch of data unlike us making a variable normally
    //console.log(event);
    if(event.key === "Enter"){
        let guess = userInput.value.toLowerCase();
        //check if the users' guess is included in our random word
        if(randomWord.includes(guess)){
            //alert("test"); - use to see if it's working
            for(let i = 0; i < randomWord.length; i++){
                if(randomWord[i] === guess){
                    letterArray[i] = guess;
                }
            }
        }
        else{
            wrongGuesses += guess;
            letterBank.textContent = wrongGuesses;
            guesses++;
        }
        updateGameState();
        userInput.value = "";
        hung(guesses);
        gameEnd();
    }
})


function hung(points){
    switch(points){
        case 1:
        hangman.innerText = "You";
        break;
        case 2:
        hangman.innerText = "You are";
        break;
        case 3:
        hangman.innerText = "You are getting";
        break;
        case 4:
        hangman.innerText = "You are getting close ";
        break;
        case 5:
        hangman.innerText = "You are getting close to being hung ";
        break;
    }
}


//functions starts
function easterEgg(){
    selectedWord.textContent = randomWord;
}

//picking the word to use (maddie's version)
function dataCall(){
    fetch('../data/data.json').then(response => response.json()).then(data =>{
        let rndNum = Math.floor(Math.random() * data.words.length)
        randomWord = data.words[rndNum];
        console.log(randomWord);
        startGame(randomWord)
    })
}

// creates the _ (underscore) for how long the word chosen to guess
function startGame(word){
    letterArray = [];
    for(let i = 0; i < word.length; i++){
        letterArray[i] = "_";
        updateGameState();
        userInput.readOnly = false;
    }
}

function updateGameState(){
    displayedWord.textContent = letterArray.join(" ");
    //displayedGuesses.textContent = `Guesses Used: ${guesses} / ${maxGuesses}`;
    displayedGuesses.textContent = "Guesses Used: " + guesses + " / " + maxGuesses;
}


function resetGame(){
    randomWord = "";
    wrongGuesses = "";
    letterArray = [];
    guesses = 0;
    userInput.readOnly = "true";
    userInput.value = "";
    displayedGuesses.textContent = "Guesses Used: X / X";
    displayedWord.textContent = "Displayed Word";
    letterBank.textContent = "Letter Bank";
    hangman.innerText = "******";
}

function gameEnd(){
    // Lose: check if guesses === maxGuesses
    // win: Check if randomWord === letterArray
    if(guesses === maxGuesses){
        alert(`You lost! Your word was ${randomWord}`);
    }
    else if(letterArray.join("") === randomWord){
        alert(`You win! Your word was ${randomWord}`);
    }

    
}