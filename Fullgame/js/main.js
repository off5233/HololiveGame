window.addEventListener('load', init);
window.onload = pageLoad;


let time = 60;
let score = 0;
let isPlaying;
let img = document.getElementById('image');
let Playgame = document.getElementById('Playgame');
let Wordrandom = 'word';
let Startgame = false;

let end ="";


const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const hintword = document.querySelector('#hint');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');


// const words = [
//   'Fauna','Mumei','Baelz','Kronii','Sana','Gura','Cali','Ina','Kiara','Amelia','IRyS'
//   ,'Korone','Okayu','Mio','Iofi','Risu','Moona','Anya','Ollie','Reine','Kaela','Kobo','Zeta','Azki','Suisei','Roboco'
//   ,'Miko','Sora','Haato','Aki','Matsuri','Fubuki','Mel','Aqua','Shion','Ayame','Subaru','Choco','Marine','Flare','Noel','Rushia','Pekora','Kanata','Luna'
//   ,'Coco','Watame','Aloe','Nene','Polka','Botan','Lamy','Koyori','Iroha','Laplus','Chloe','Lui'

// ];

function pageLoad()
  {
    Playgame.addEventListener('click', () => { playgame(); })
    wordInput.style.display="none";
   //hintword.style.display="none";

  //for(var i = 0; i < words.length ; i++){ GameArray(words[i]);}
  

  }


  // async function GameArray(wordss){

  //   let response = await fetch("/writeGameArray",{
  //     method: "POST",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       words:wordss})
  //   });

  // }



  
function init() {

  wordInput.addEventListener('input',startMatch);
  setInterval(countdown, 1000);
  setInterval(checkStatus, 1);

}


function playgame()
{


  Startgame = true; 
  wordInput.value = '';
  time = 60;
  score = 0;  
  currentWord.innerHTML  = '';
  Playgame.innerHTML= "Restart";
  Playgame.style.display="none";
  wordInput.style.display="block";
  hintword.style.display="block";
  scoreDisplay.innerHTML = score;

  readWORD();

}



// Start match
function startMatch()
{
  if (matchWords()) {
    isPlaying = true;
    readWORD();
    wordInput.value = '';
  }
}


// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value == Wordrandom || wordInput.value == Wordrandom.toLowerCase() || wordInput.value == Wordrandom.toUpperCase() && time !== 0 && Startgame != false ) {
    score++;
    scoreDisplay.innerHTML = score;
    return true;
  } else {
    return false;
  }
  
}

//

async function readWORD(){

	let response = await fetch("/readWORD");
	let content = await response.json();
	let post = await Randomword(JSON.parse(content));
}

function Randomword(data){

	var keys = Object.keys(data);
  const randIndex = Math.floor(Math.random()*keys.length);
  

  img.src = `Hololive/Shadow_hololive/${data[keys[randIndex]]["imgshadow"]}`;
  hintword.innerHTML =  data[keys[randIndex]]["hint"];
  Wordrandom = data[keys[randIndex]]["word"];
  end = `Hololive/Shadow_hololive/${data[keys[randIndex]]["imgend"]}`;
}



function countdown() {
  if (time > 0 && Startgame == true) {
    time--;
  } else if (time === 0) {
    isPlaying = false;
    Playgame.style.display="block";
    wordInput.style.display="none";
    hintword.style.display="none";
    endgame(Wordrandom);
  }
  timeDisplay.innerHTML = time;
}

function endgame(Wordrandom)
{
  img.src = end;

}

// Check game status
function checkStatus() 
{
  if (!isPlaying && time === 0 &&  Startgame == true) 
  {   
    currentWord.innerHTML = Wordrandom; 
    Startgame = false
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