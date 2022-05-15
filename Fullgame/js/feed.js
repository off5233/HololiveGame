// check ว่ามีการ set cookies หรือยังถ้ามีจะไปยัง feed.html แต่ถ้าไม่มีจะกลับไปที่ login.html
function checkCookie(){
	var username = "";
	if(getCookie("username")==false){
		window.location = "login.html";
	}
}

checkCookie();
window.onload = pageLoad;
//window.addEventListener('load', init);

function getCookie(name){
	var value = "";
	try{
		value = document.cookie.split("; ").find(row => row.startsWith(name)).split('=')[1]
		return value
	}catch(err){
		return false
	} 
}

function pageLoad(){
	document.getElementById('fileField').onchange = fileSubmit;
	var username = getCookie('username');
	console.log(getCookie('username'));
	document.getElementById("username").innerHTML = username;
	readPost();
	readboard();

}

function getData(user){

	var username = getCookie('username');
	var msg = 
	
	"[ ถึง  "+ user["username"] + " || Score :  " + user["score"] + " ] : [ " + username + " : " + document.getElementById("textmsg").value +" ]";
	document.getElementById("textmsg").value = "";
	writePost(msg);
}

function fileUpload(){
	document.getElementById('fileField').click();
}

function fileSubmit(){
	document.getElementById('formId').submit();
}


let tablename = "userInfo";
let tablename_msg = "msgInfo";
let tablename_Scoreboard = "Scoreboard";

// complete it
async function readPost(){

	let response = await fetch("/readPost");
	let content = await response.json();
	let post = await showPost(JSON.parse(content));
}

// complete it
async function writePost(msg){
	var username = getCookie('username');
	let response = await fetch("/writePost",{
		method: "POST",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			user:username,
			message:msg})
	});
	readPost();
	readboard();
}

var rankid = [];
var topScore = [];
var likebutton = [] ;
var commandbutton = [];

async function readboard(){
	let response = await fetch("/readboard");
	let content = await response.json();
	let rundescendingorder = await descendingorder(JSON.parse(content))
	let post = await showboard(JSON.parse(content));
	let setdescscorelike = await descscorelike(topScore)
}


function descendingorder(userData){
	var key = Object.keys(userData);

	if(topScore[0] != null)
	{
		topScore.splice(0, topScore.length);
	}

    {
		for(var i = 0; i < key.length; i++){
			var userScore = userData[key[i]]
			if(topScore[0] == null){
				topScore[0] = userScore
			}else{
				var newTopScore = userScore
				var topScoreLength = topScore.length
	
				for(var j = 0; j <= topScoreLength; j++){
					if(j == topScoreLength){
						topScore.push(newTopScore)
					}
	
					if(newTopScore.score > topScore[j].score){
						var oldScore = topScore[j]
						topScore[j] = newTopScore
						newTopScore = oldScore
					}
				}
			}
		}

	}
}


function descscorelike(topScore){

	for(var n = 0 , i = 2 ; n < 3; n++, i--){
		var user = topScore[n]
		rankid[i].innerHTML = "Rank : "+ (n+1) +" || " + user["username"] +" || Score :  " + user["score"] +" || Like : " + user["likelove"];
	}

}


function showboard(data){
	var keys = Object.keys(data);
	var divTag = document.getElementById("feed-container");
	divTag.innerHTML = "";
	for (var i = keys.length-1 , max = 2 ; i >=0  && max >= 0 ; i-- , max-- ) {

		var temp = document.createElement("div");
		temp.className = "newsfeed";
		divTag.appendChild(temp);

		
		var temp1 = document.createElement("div");
		temp1.id = "rank"+max;
		temp1.className = "postmsg";
		temp1.innerHTML = "";
		temp.appendChild(temp1);

		rankid[max] = document.getElementById("rank"+max);

		var buttonlike = document.createElement('button');
		buttonlike.id = "buttonlikelove"+max;
		buttonlike.className = "postuser";
		buttonlike.innerHTML =  "Like";
		temp.appendChild(buttonlike);

		var buttonCommand= document.createElement('button');
		buttonCommand.id = "buttonCommand"+max;
		buttonCommand.className = "postuser";
		buttonCommand.innerHTML =  "Command";
		temp.appendChild(buttonCommand);

	}
	setLike();
	setcommand();
}


function setcommand(){
	

	commandbutton[0] =  document.getElementById('buttonCommand0');
    commandbutton[0].addEventListener('click', () => { getData(topScore[2]); })
	commandbutton[1] =  document.getElementById('buttonCommand1');
	commandbutton[1].addEventListener('click', () => {	getData(topScore[1]); })
	commandbutton[2] =  document.getElementById('buttonCommand2');
	commandbutton[2].addEventListener('click', () => {	getData(topScore[0]); })

	console.log(commandbutton);
}

function setLike(){
	
	likebutton[0] =  document.getElementById('buttonlikelove0');
    likebutton[0].addEventListener('click', () => { B_scorelike(topScore[2]); })
	likebutton[1] =  document.getElementById('buttonlikelove1');
	likebutton[1].addEventListener('click', () => {	B_scorelike(topScore[1]); })
	likebutton[2] =  document.getElementById('buttonlikelove2');
	likebutton[2].addEventListener('click', () => {	B_scorelike(topScore[0]); })
}




function B_scorelike(likelove){
	console.log(likelove["likelove"]);
	likelove["likelove"] += 1 
	writeLikeScore(likelove)
	descscorelike(topScore)
}





async function writeLikeScore(userlike){

	let response = await fetch("/writeLikeScore",{
		method: "POST",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			user:userlike["username"],
			like:userlike["likelove"]})
		});
}

function showPost(data){
	var keys = Object.keys(data);
	var divTag = document.getElementById("feed-container2");
	divTag.innerHTML = "";
	for (var i = keys.length-1 , max = 1 ; i >=0 && max < 5 ; i-- ,max++) {

		var temp = document.createElement("div");
		temp.className = "newsfeed";
		divTag.appendChild(temp);

		var temp1 = document.createElement("div");
		temp1.innerHTML = data[keys[i]]["message"];
		temp.appendChild(temp1);
	}
}





