const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum congue leo eget malesuada. Donec rutrum congue leo eget malesuada. Donec rutrum congue leo eget malesuada. Donec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Donec rutrum congue leo eget malesuada. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Donec sollicitudin molestie malesuada. Donec rutrum congue leo eget malesuada. Sed porttitor lectus nibh. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Nulla porttitor accumsan tincidunt. Nulla quis lorem ut libero malesuada feugiat.";

const startGame = document.getElementById("startGame");
const displayWord = document.getElementById("displayWord");
const inputWord = document.getElementById("inputWord");
const stats = document.getElementById("stats");
const form = document.getElementById("form");
const wordsInputted = document.getElementById("wordsInputted");
const scoreScore = document.getElementById("score-score");
const scoreWpm = document.getElementById("score-wpm");
const scoreTime = document.getElementById("score-time");
const infoType = document.getElementById("info");
const leaderboardBtn = document.getElementById("leaderboardBtn");
const leaderBoard = document.getElementById("leaderBoard");

let startInterval;

const state = {
    currentWord: '',
    correctWords: 0,
    gameDuration: 10,
    timeElapse:0
}
//split the words and store to words
const words = lorem.split(' ');

//get a random word
const randomWord = () => words[Math.floor(Math.random() * words.length)]

//display random word and set it in the state.currentWord
const displayRandomWord = () => {
    const word = randomWord();
    displayWord.textContent = word;
    state.currentWord = word ;

}

// click the start game button
startGame.addEventListener('click', () => {

    // hide button
    startGame.classList.add("hide");

    // show stats
    stats.classList.remove('hide')

    // show input and focus on input
    inputWord.classList.remove('hide')
    inputWord.focus();

    // show word
    displayWord.classList.remove('hide');
    wordsInputted.classList.remove('hide')

    // display the random word
    displayRandomWord();

    // clear input area
    inputWord.value ="";

    // start timer
    startInterval = setInterval(timer,1000);

})

// timer 
const timer = () =>{
        //increament the time
        state.timeElapse ++;
        renderStats();

        if(state.timeElapse === state.gameDuration){
            clearInterval(startInterval);
            state.currentWord = 0;
            state.correctWords = 0;
            state.timeElapse = 0;
            infoType.classList =  "hide"

            const scores = JSON.parse(localStorage.getItem('highscores')) || [];
            scores.push(scoreWpm.textContent);
            scores.sort();

            if(scores.length > 10) {
                scores.shift();
            }
            
            if(scoreWpm.textContent != 0.00) localStorage.setItem('highscores',JSON.stringify(scores));
        }
    }

//create span word with color
const span = (color, word) => {
    // create span element
    let span = document.createElement("span");
    // set color in the span
    span.classList = color;
    // set the word 
    span.innerText = word;
    // return the complete span
    return span
}

//stats
const renderStats = () => {
    // display correct words
    scoreScore.innerText = state.correctWords;
    // calculate wpm
    // correct words devided by ( passed time devided by 1 minute)
    scoreWpm.innerText = Number(state.correctWords / (state.timeElapse/ 60)).toFixed(2)
    scoreTime.innerText = state.gameDuration - state.timeElapse
}

// input word 
form.addEventListener('submit', e => {
    e.preventDefault();

    pressKey();

})

document.body.onkeyup = function(e) {
    if (e.key == " " ||
        e.code == "Space" ||      
        e.keyCode == 32      
    ) {
        pressKey(e);
    }
}

const pressKey = (e) => {
     // store the current random word
     const currentWord = state.currentWord;
    
    // get the word in the input
    const word = inputWord.value.replace(/ /g, '');
    if(word === "" || word === " ") return;
    
    //record correct words
    if(word === currentWord) {
        state.correctWords += 1;
        renderStats();
    }

    // display new random word
    displayRandomWord();

    //validate if it matched to the current word
    let color = word === currentWord ? "green" : "red"

    //append current random word
    wordsInputted.prepend(span(color,word))
    
    //clear input
    inputWord.value ="";
}

leaderboardBtn.addEventListener('click',() => {
    
    const scores = JSON.parse(localStorage.getItem('highscores'));

    const list = content => {
        const li = document.createElement('li');
        li.textContent = content;
        return li
    }
    
    const allScores = scores.map( (s) => {
        list(s)
    })
    const displayScore = document.createElement('div');
    displayScore.innerHTML = allScores;
    leaderBoard.appendChild(displayScore)
})