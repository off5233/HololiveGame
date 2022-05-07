window.addEventListener('load', init);

let time = 60;
let score = 0;
let isPlaying;
let img = document.getElementById('image');
let Wordrandom = 'word';
let Startgame = false;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const hintword = document.querySelector('#hint');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = [
  'Fauna','Mumei','Baelz','Kronii','Sana'
];

// Initialize Game
function init() {

  wordInput.addEventListener('input',startMatch);
  setInterval(countdown, 1000);
  setInterval(checkStatus, 50);
}

// Start match
function startMatch()
{
  if(wordInput.value === 'Start'){ Startgame = true; wordInput.value = '';  showWord(words); }
  if (matchWords()) {
    isPlaying = true;
    showWord(words);
    wordInput.value = '';
  }
}





// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === Wordrandom  && time !== 0 && Startgame != false ) {
    score++;
    scoreDisplay.innerHTML = score;
    return true;
  } else {
    return false;
  }
  
}

// Pick & show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  if(words[randIndex] === 'Fauna' ) { img.src = 'Hololive/Shadow_hololive/GEN EN Council/Ceres_Fauna_Shadow.png';  hintword.innerHTML = "พระแม่ธรณี"; }
  else if(words[randIndex] === 'Baelz') { img.src = 'Hololive/Shadow_hololive/GEN EN Council/Hakos_Baelz_Shadow.png';  hintword.innerHTML = "หนูแห่งความโกลาหร"; }
  else if(words[randIndex] === 'Mumei') { img.src = 'Hololive/Shadow_hololive/GEN EN Council/Nanashi_Mumei_Shadow.png';  hintword.innerHTML = "ชอบกินBerryในMinecraftมาก"; }
  else if(words[randIndex] === 'Kronii') { img.src = 'Hololive/Shadow_hololive/GEN EN Council/Ouro_Kronii_Shadow.png';  hintword.innerHTML = "กาลเวลาที่หลุดตลอดเวลา"; }
  else if(words[randIndex] === 'Sana') { img.src = 'Hololive/Shadow_hololive/GEN EN Council/Tsukumo_Sana_Shadow.png';  hintword.innerHTML = "อวกาศ"; }
  Wordrandom = words[randIndex];

}


// Countdown timer
function countdown() {
  // Make sure time is not run out
  if (time > 0 && Startgame != false) {
    // Decrement
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
    endgame(Wordrandom);
  }
  // Show time
  timeDisplay.innerHTML = time;
}

function endgame(Wordrandom)
{
  if(Wordrandom === 'Fauna') { img.src = 'Hololive/Shadow_hololive/GEN EN Council/Ceres_Fauna_Portrait.png';}
  else if(Wordrandom=== 'Baelz') { img.src = 'Hololive/Shadow_hololive/GEN EN Council/Hakos_Baelz_Portrait.png';}
  else if(Wordrandom === 'Mumei') { img.src = 'Hololive/Shadow_hololive/GEN EN Council/Nanashi_Mumei_Portrait.png';}
  else if(Wordrandom === 'Kronii') { img.src = 'Hololive/Shadow_hololive/GEN EN Council/Ouro_Kronii_Portrait.png';}
  else if(Wordrandom === 'Sana') { img.src = 'Hololive/Shadow_hololive/GEN EN Council/Tsukumo_Sana_Portrait.png';}

}

// Check game status
function checkStatus() 
{
  if (!isPlaying && time === 0 &&  Startgame != false) 
  {   
    currentWord.innerHTML = Wordrandom; 
    Startgame = false
    console.log(score);
    savescoreword(score);
  }
}

function getCookie(name){
	var value = "";
	try{
		value = document.cookie.split("; ").find(row => row.startsWith(name)).split('=')[1]
		return value
	}catch(err){
		return false
	} 
}

async function savescoreword(score){
  alert("savescorewordrun");
	var username = getCookie('username');
	let response = await fetch("/savescoreword",{
		method: "POST",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			user:username,
			score:score})
	});


}



