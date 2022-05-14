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
  else if(words[randIndex] === 'baelz') { img.src = 'Hololive/Shadow_hololive/GEN EN Council/Hakos_Baelz_Shadow.png';  hintword.innerHTML = "หนูแห่งความโกลาหร"; }
  else if(words[randIndex] === 'mumei') { img.src = 'Hololive/Shadow_hololive/GEN EN Council/Nanashi_Mumei_Shadow.png';  hintword.innerHTML = "ชอบกินBerryในMinecraftมาก"; }
  else if(words[randIndex] === 'kronii') { img.src = 'Hololive/Shadow_hololive/GEN EN Council/Ouro_Kronii_Shadow.png';  hintword.innerHTML = "กาลเวลาที่หลุดตลอดเวลา"; }
  else if(words[randIndex] === 'sana') { img.src = 'Hololive/Shadow_hololive/GEN EN Council/Tsukumo_Sana_Shadow.png';  hintword.innerHTML = "อวกาศ"; }

  else if(words[randIndex] === 'gura') { img.src = 'Hololive/Shadow_hololive/GEN EN Myth/Gawr_Gura_Shadow.png';  hintword.innerHTML = "a"; }
  else if(words[randIndex] === 'cali') { img.src = 'Hololive/Shadow_hololive/GEN EN Myth/Mori_Calliope_Shadow.png';  hintword.innerHTML = "Dad!!!"; }
  else if(words[randIndex] === 'ina') { img.src = 'Hololive/Shadow_hololive/GEN EN Myth/Ninomae_Ina_nis_Shadow.png';  hintword.innerHTML = "พระแม่แห่งเหล่าTakodachi"; }
  else if(words[randIndex] === 'kiara') { img.src = 'Hololive/Shadow_hololive/GEN EN Myth/Takanashi_Kiara_Shadow.png';  hintword.innerHTML = "เจ้าของร้านKFP"; }
  else if(words[randIndex] === 'amelia') { img.src = 'Hololive/Shadow_hololive/GEN EN Myth/Watson_Amelia_Shadow.png';  hintword.innerHTML = "Ground Pound your Mom"; }
  
  else if(words[randIndex] === 'irys') { img.src = 'Hololive/Shadow_hololive/HOPE/IRyS_Shadow.png';  hintword.innerHTML = "Hope ความหวังสดท้าย(มั้งนะ)"; }

  else if(words[randIndex] === 'korone') { img.src = 'Hololive/Shadow_hololive/GEN GAMER/Inugami_Korone_Shadow.png';  hintword.innerHTML = "ํYubi Yubi!!!"; }
  else if(words[randIndex] === 'okayu') { img.src = 'Hololive/Shadow_hololive/GEN GAMER/Nekomata_Okayu_Shadow.png';  hintword.innerHTML = "ํMogu Mogu"; }
  else if(words[randIndex] === 'mio') { img.src = 'Hololive/Shadow_hololive/GEN GAMER/Ookami_Mio_Shadow.png';  hintword.innerHTML = "ํคุณแม่ประจำHololive"; }

  else if(words[randIndex] === 'lofi') { img.src = 'Hololive/Shadow_hololive/GEN ID1/Airani_lofifteen_Shadow.png';  hintword.innerHTML = "ํmeme Girl"; }
  else if(words[randIndex] === 'risu') { img.src = 'Hololive/Shadow_hololive/GEN ID1/Ayunda_Risu_Shadow.png';  hintword.innerHTML = "ํน้องกระรอก"; }
  else if(words[randIndex] === 'moona') { img.src = 'Hololive/Shadow_hololive/GEN ID1/Moona_Hoshinova_Shadow.png';  hintword.innerHTML = "ํดวงจันทร์ผู้มีความสามารถท่วมท้น"; }

  else if(words[randIndex] === 'anya') { img.src = 'Hololive/Shadow_hololive/GEN ID2/Anya_Melifissa_Shadow.png';  hintword.innerHTML = "ํสาวน้อยอาวุธโบราณ"; }
  else if(words[randIndex] === 'ollie') { img.src = 'Hololive/Shadow_hololive/GEN ID2/Kureiji_Ollie_Shadow.png';  hintword.innerHTML = "ํซอมบี้ผู้ติดApexหนัก"; }
  else if(words[randIndex] === 'reine') { img.src = 'Hololive/Shadow_hololive/GEN ID2/Pavolia_Reine_Shadow.png';  hintword.innerHTML = "ํพี่สาวประจำรุ่นIDรุ่น2"; }

  else if(words[randIndex] === 'kaela') { img.src = 'Hololive/Shadow_hololive/GEN ID3/Kaela_Kovalskia_Shadow.png';  hintword.innerHTML = "ํเพนกวิ้นผู้ติดlol wildrift หนัก"; }
  else if(words[randIndex] === 'kobo') { img.src = 'Hololive/Shadow_hololive/GEN ID3/Kobo_Kanaeru_Shadow.png';  hintword.innerHTML = "ํน้องคลื่นทะเล"; }
  else if(words[randIndex] === 'Zeta') { img.src = 'Hololive/Shadow_hololive/GEN ID3/Vestia_Zeta_Shadow.png';  hintword.innerHTML = "ํหน่อแมว"; }

  else if(words[randIndex] === 'azki') { img.src = 'Hololive/Shadow_hololive/GEN0/AZKi_Shadow.png';  hintword.innerHTML = "The last seiso(น่าจะ)"; }
  else if(words[randIndex] === 'suisei') { img.src = 'Hololive/Shadow_hololive/GEN0/Hoshimachi_Suisei_Shadow.png';  hintword.innerHTML = "ํสาวผู้เปรียบดั่งดางหาง"; }
  else if(words[randIndex] === 'roboco') { img.src = 'Hololive/Shadow_hololive/GEN0/Roboco_Shadow.png';  hintword.innerHTML = "ํHellobo"; }
  else if(words[randIndex] === 'miko') { img.src = 'Hololive/Shadow_hololive/GEN0/Sakura_Miko_Shadow.png';  hintword.innerHTML = "ํElite English"; }
  else if(words[randIndex] === 'sora') { img.src = 'Hololive/Shadow_hololive/GEN0/Tokino_Sora_Shadow.png';  hintword.innerHTML = "ํผู้บุกเบิกยุคHololive"; }

  else if(words[randIndex] === 'haato') { img.src = 'Hololive/Shadow_hololive/GEN1/Akai_Haato_Shadow.png';  hintword.innerHTML = "สาวน้อยผู้มี2ตัวตน"; }
  else if(words[randIndex] === 'hachama') { img.src = 'Hololive/Shadow_hololive/GEN1/Akai_Haato_Shadow.png';  hintword.innerHTML = "สาวน้อยผู้มี2ตัวตน"; }
  else if(words[randIndex] === 'aki') { img.src = 'Hololive/Shadow_hololive/GEN1/Aki_Rosenthal_Shadow.png';  hintword.innerHTML = "สาวผู้มีท่าเต้นเป็นเอกลักษณ์"; }
  else if(words[randIndex] === 'matsuri') { img.src = 'Hololive/Shadow_hololive/GEN1/Natsurio_Matsuri_Shadow.png';  hintword.innerHTML = "ํGOD(เจ้าตัวบอกงี้)"; }
  else if(words[randIndex] === 'fubuki') { img.src = 'Hololive/Shadow_hololive/GEN1/Shirakami_Fubuki_Shadow.png';  hintword.innerHTML = "Friend"; }
  else if(words[randIndex] === 'mel') { img.src = 'Hololive/Shadow_hololive/GEN1/Yozora_Mel_Shadow.png';  hintword.innerHTML = "น้องแวมไพร์ SEISO(น่าจะ)"; }

  else if(words[randIndex] === 'aqua') { img.src = 'Hololive/Shadow_hololive/GEN2/Minato_Aqua_Shadow.png';  hintword.innerHTML = "หัวหอม"; }
  else if(words[randIndex] === 'shion') { img.src = 'Hololive/Shadow_hololive/GEN2/Murasaki_Shion_Shadow.png';  hintword.innerHTML = "NEEEE"; }
  else if(words[randIndex] === 'ayame') { img.src = 'Hololive/Shadow_hololive/GEN2/Nakiri_Ayame_Shadow.png';  hintword.innerHTML = "Ojosan"; }
  else if(words[randIndex] === 'subaru') { img.src = 'Hololive/Shadow_hololive/GEN2/Oozora_Subaru_Shadow.png';  hintword.innerHTML = "Shuba!!!"; }
  else if(words[randIndex] === 'choco') { img.src = 'Hololive/Shadow_hololive/GEN2/Yuzuki_Choco_Shadow.png';  hintword.innerHTML = "ราชินีแห่งASMR"; }

  else if(words[randIndex] === 'marine') { img.src = 'Hololive/Shadow_hololive/GEN3/Houshou_Marine_Shadow.png';  hintword.innerHTML = "Ahoy!!!"; }
  else if(words[randIndex] === 'flare') { img.src = 'Hololive/Shadow_hololive/GEN3/Shiranui_Flare_Shadow.png';  hintword.innerHTML = "ศัตรูโดยธรรมชาติของSan"; }
  else if(words[randIndex] === 'noel') { img.src = 'Hololive/Shadow_hololive/GEN3/Shirogane_Noel_Shadow.png';  hintword.innerHTML = "ดันโจ"; }
  else if(words[randIndex] === 'rushia') { img.src = 'Hololive/Shadow_hololive/GEN3/Uruha_Rushia_Shadow.png';  hintword.innerHTML = "สาวเขียงผู้มีเสียงทรงพลัง"; }
  else if(words[randIndex] === 'pekora') { img.src = 'Hololive/Shadow_hololive/GEN3/Usada_Pekora_Shadow.png';  hintword.innerHTML = "เสียงหัวเราะเป็นเอกลัษณ์"; }

  else if(words[randIndex] === 'kanata') { img.src = 'Hololive/Shadow_hololive/GEN4/Amane_Kanata_Shadow.png';  hintword.innerHTML = "กอลิล่าพลังบีบ10ตัน"; }
  else if(words[randIndex] === 'luna') { img.src = 'Hololive/Shadow_hololive/GEN4/Himemori_Luna_Shadow.png';  hintword.innerHTML = "คำพูดติดปาก Nanora"; }
  else if(words[randIndex] === 'coco') { img.src = 'Hololive/Shadow_hololive/GEN4/Kiryu_Coco_Shadow.png';  hintword.innerHTML = "Hi Mother F*cker"; }
  else if(words[randIndex] === 'towa') { img.src = 'Hololive/Shadow_hololive/GEN4/Tokoyami_Towa_Shadow.png';  hintword.innerHTML = "TMT TMT!!!"; }
  else if(words[randIndex] === 'watame') { img.src = 'Hololive/Shadow_hololive/GEN4/Tsunomaki_Watame_Shadow.png';  hintword.innerHTML = "อาหารฉุกเฉินประจำHololive"; }

  else if(words[randIndex] === 'aloe') { img.src = 'Hololive/Shadow_hololive/GEN5/Mano_Aloe_Shadow.png';  hintword.innerHTML = "น้องว่าน"; }
  else if(words[randIndex] === 'nene') { img.src = 'Hololive/Shadow_hololive/GEN5/Momosuzu_Nene_Shadow.png';  hintword.innerHTML = "ภรรยาแห่งชาติ"; }
  else if(words[randIndex] === 'polka') { img.src = 'Hololive/Shadow_hololive/GEN5/Omaru_Polka_Shadow.png';  hintword.innerHTML = "ลูกรักYAGOO"; }
  else if(words[randIndex] === 'botan') { img.src = 'Hololive/Shadow_hololive/GEN5/Shishiro_Botan_Shadow.png';  hintword.innerHTML = "เสือสาวจ้าวFPS"; }
  else if(words[randIndex] === 'lamy') { img.src = 'Hololive/Shadow_hololive/GEN5/Yukihana_Lamy_Shadow.png';  hintword.innerHTML = "ลำยอง"; }

  else if(words[randIndex] === 'koyori') { img.src = 'Hololive/Shadow_hololive/GEN6/Hakui_Koyori_Shadow.png';  hintword.innerHTML = "ผู้มีชั่วโมงไลฟ์ในหนึ่งวันเยอะมาก"; }
  else if(words[randIndex] === 'iroha') { img.src = 'Hololive/Shadow_hololive/GEN6/Kazama_Iroha_Shadow.png';  hintword.innerHTML = "ไม่ใช่นินจา ซามูไร ต่างหาก!!!"; }
  else if(words[randIndex] === 'la+') { img.src = 'Hololive/Shadow_hololive/GEN6/La+_Darknesss_Shadow.png';  hintword.innerHTML = "YAMADA!!!"; }
  else if(words[randIndex] === 'laplus') { img.src = 'Hololive/Shadow_hololive/GEN6/La+_Darknesss_Shadow.png';  hintword.innerHTML = "YAMADA!!!"; }
  else if(words[randIndex] === 'chloe') { img.src = 'Hololive/Shadow_hololive/GEN6/Sakamata_Chole_Shadow.png';  hintword.innerHTML = "น้องวาฬสาย M"; }
  else if(words[randIndex] === 'lui') { img.src = 'Hololive/Shadow_hololive/GEN6/Takane_Lui_Shadow.png';  hintword.innerHTML = "คุณแม่ประจำรุ่น6"; }



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

  else if(words[randIndex] === 'Gura') { img.src = 'Hololive/Shadow_hololive/GEN EN Myth/Gawr_Gura_Portrait.png';}
  else if(words[randIndex] === 'Calli') { img.src = 'Hololive/Shadow_hololive/GEN EN Myth/Mori_Calliope_Portrait.png';}
  else if(words[randIndex] === 'Ina') { img.src = 'Hololive/Shadow_hololive/GEN EN Myth/Ninomae_Ina_nis_Portrait.png';}
  else if(words[randIndex] === 'Kiara') { img.src = 'Hololive/Shadow_hololive/GEN EN Myth/Takanashi_Kiara_Portrait.png';}
  else if(words[randIndex] === 'Amelia') { img.src = 'Hololive/Shadow_hololive/GEN EN Myth/Watson_Amelia_Portrait.png';}
  
  else if(words[randIndex] === 'IRys') { img.src = 'Hololive/Shadow_hololive/HOPE/IRyS_Portrait.png';}

  else if(words[randIndex] === 'Korone') { img.src = 'Hololive/Shadow_hololive/GEN GAMER/Inugami_Korone_Portrait.png';}
  else if(words[randIndex] === 'Okayu') { img.src = 'Hololive/Shadow_hololive/GEN GAMER/Nekomata_Okayu_Portrait.png';}
  else if(words[randIndex] === 'Mio') { img.src = 'Hololive/Shadow_hololive/GEN GAMER/Ookami_Mio_Portrait.png';}

  else if(words[randIndex] === 'Lofifteen') { img.src = 'Hololive/Shadow_hololive/GEN ID1/Airani_lofifteen_Portrait.png';}
  else if(words[randIndex] === 'Risu') { img.src = 'Hololive/Shadow_hololive/GEN ID1/Ayunda_Risu_Portrait.png';}
  else if(words[randIndex] === 'Moona') { img.src = 'Hololive/Shadow_hololive/GEN ID1/Moona_Hoshinova_Portrait.png';}

  else if(words[randIndex] === 'Anya') { img.src = 'Hololive/Shadow_hololive/GEN ID2/Anya_Melifissa_Portrait.png';}
  else if(words[randIndex] === 'Ollie') { img.src = 'Hololive/Shadow_hololive/GEN ID2/Kureiji_Ollie_Portrait.png';}
  else if(words[randIndex] === 'Reine') { img.src = 'Hololive/Shadow_hololive/GEN ID2/Pavolia_Reine_Portrait.png';}

  else if(words[randIndex] === 'Kaela') { img.src = 'Hololive/Shadow_hololive/GEN ID3/Kaela_Kovalskia_Portrait.png';}
  else if(words[randIndex] === 'Kobo') { img.src = 'Hololive/Shadow_hololive/GEN ID3/Kobo_Kanaeru_Portrait.png';}
  else if(words[randIndex] === 'Zeta') { img.src = 'Hololive/Shadow_hololive/GEN ID3/Vestia_Zeta_Portrait.png';}

  else if(words[randIndex] === 'Azki') { img.src = 'Hololive/Shadow_hololive/GEN0/AZKi_Portrait.png';}
  else if(words[randIndex] === 'Suisei') { img.src = 'Hololive/Shadow_hololive/GEN0/Hoshimachi_Suisei_Portrait.png';}
  else if(words[randIndex] === 'Roboco') { img.src = 'Hololive/Shadow_hololive/GEN0/Roboco_Portrait.png';}
  else if(words[randIndex] === 'Miko') { img.src = 'Hololive/Shadow_hololive/GEN0/Sakura_Miko_Portrait.png';}
  else if(words[randIndex] === 'Sora') { img.src = 'Hololive/Shadow_hololive/GEN0/Tokino_Sora_Portrait.png';}

  else if(words[randIndex] === 'Haato') { img.src = 'Hololive/Shadow_hololive/GEN1/Akai_Haato_Portrait.png';}
  else if(words[randIndex] === 'Aki') { img.src = 'Hololive/Shadow_hololive/GEN1/Aki_Rosenthal_Portrait.png';}
  else if(words[randIndex] === 'Matsuri') { img.src = 'Hololive/Shadow_hololive/GEN1/Natsurio_Matsuri_Portrait.png';}
  else if(words[randIndex] === 'Fubuki') { img.src = 'Hololive/Shadow_hololive/GEN1/Shirakami_Fubuki_Portrait.png';}
  else if(words[randIndex] === 'Mel') { img.src = 'Hololive/Shadow_hololive/GEN1/Yozora_Mel_Portrait.png';}

  else if(words[randIndex] === 'Aqua') { img.src = 'Hololive/Shadow_hololive/GEN2/Minato_Aqua_Portrait.png';}
  else if(words[randIndex] === 'Shion') { img.src = 'Hololive/Shadow_hololive/GEN2/Murasaki_Shion_Portrait.png';}
  else if(words[randIndex] === 'Ayame') { img.src = 'Hololive/Shadow_hololive/GEN2/Nakiri_Ayame_Portrait.png';}
  else if(words[randIndex] === 'Subaru') { img.src = 'Hololive/Shadow_hololive/GEN2/Oozora_Subaru_Portrait.png';}
  else if(words[randIndex] === 'Choco') { img.src = 'Hololive/Shadow_hololive/GEN2/Yuzuki_Choco_Portrait.png';}

  else if(words[randIndex] === 'Marine') { img.src = 'Hololive/Shadow_hololive/GEN3/Houshou_Marine_Portrait.png';}
  else if(words[randIndex] === 'Flare') { img.src = 'Hololive/Shadow_hololive/GEN3/Shiranui_Flare_Portrait.png';}
  else if(words[randIndex] === 'Noel') { img.src = 'Hololive/Shadow_hololive/GEN3/Shirogane_Noel_Portrait.png';}
  else if(words[randIndex] === 'Rushia') { img.src = 'Hololive/Shadow_hololive/GEN3/Uruha_Rushia_Portrait.png';}
  else if(words[randIndex] === 'Pekora') { img.src = 'Hololive/Shadow_hololive/GEN3/Usada_Pekora_Portrait.png';}

  else if(words[randIndex] === 'Kanata') { img.src = 'Hololive/Shadow_hololive/GEN4/Amane_Kanata_Portrait.png';}
  else if(words[randIndex] === 'Luna') { img.src = 'Hololive/Shadow_hololive/GEN4/Himemori_Luna_Portrait.png';}
  else if(words[randIndex] === 'Coco') { img.src = 'Hololive/Shadow_hololive/GEN4/Kiryu_Coco_Portrait.png';}
  else if(words[randIndex] === 'Towa') { img.src = 'Hololive/Shadow_hololive/GEN4/Tokoyami_Towa_Portrait.png';}
  else if(words[randIndex] === 'Watame') { img.src = 'Hololive/Shadow_hololive/GEN4/Tsunomaki_Watame_Portrait.png';}

  else if(words[randIndex] === 'Aloe') { img.src = 'Hololive/Shadow_hololive/GEN5/Mano_Aloe_Portrait.png';}
  else if(words[randIndex] === 'Nene') { img.src = 'Hololive/Shadow_hololive/GEN5/Momosuzu_Nene_Portrait.png';}
  else if(words[randIndex] === 'Polka') { img.src = 'Hololive/Shadow_hololive/GEN5/Omaru_Polka_Portrait.png';}
  else if(words[randIndex] === 'Botan') { img.src = 'Hololive/Shadow_hololive/GEN5/Shishiro_Botan_Portrait.png';}
  else if(words[randIndex] === 'Lamy') { img.src = 'Hololive/Shadow_hololive/GEN5/Yukihana_Lamy_Portrait.png';}

  else if(words[randIndex] === 'Koyori') { img.src = 'Hololive/Shadow_hololive/GEN6/Hakui_Koyori_Portrait.png';}
  else if(words[randIndex] === 'Iroha') { img.src = 'Hololive/Shadow_hololive/GEN6/Kazama_Iroha_Portrait.png';}
  else if(words[randIndex] === 'La+') { img.src = 'Hololive/Shadow_hololive/GEN6/La+_Darknesss_Portrait.png';}
  else if(words[randIndex] === 'Chloe') { img.src = 'Hololive/Shadow_hololive/GEN6/Sakamata_Chole_Portrait.png';}
  else if(words[randIndex] === 'Lui') { img.src = 'Hololive/Shadow_hololive/GEN6/Takane_Lui_Portrait.png';}

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



