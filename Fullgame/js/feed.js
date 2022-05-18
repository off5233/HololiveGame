function checkCookie(){
	var username = "";
	if(getCookie("username")==false){	window.location = "login.html";}
}

checkCookie();
window.onload = pageLoad;

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
	var username = getCookie('username');
	document.getElementById("username").innerHTML = username;
	readPost();
	readboard();

}

function getData(user){

	console.log("getData");

	var username = getCookie('username');
	var msg = "[ ถึง  "+ user["username"] + " || Score :  " + user["score"] + " ] : [ " + username + " : " + document.getElementById("textmsg").value +" ]";
	document.getElementById("textmsg").value = "";
	writePost(msg);
}


let tablename = "userInfo";
let tablename_msg = "msgInfo";
let tablename_Scoreboard = "Scoreboard";

async function readPost(){

	let response = await fetch("/readPost");
	let content = await response.json();
	let post = await showPost(JSON.parse(content));
}

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
}

var rankid = [];
var nameid = [];
var scoreid = [];
var likeid = [];

var topScore = [];
var likebutton = [] ;
var Commentbutton = [];

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
		if(topScore[0] == null){	topScore[0] = userScore	}
			
		else{
		var newTopScore = userScore
		var topScoreLength = topScore.length
		for(var j = 0; j <= topScoreLength; j++){if(j == topScoreLength){topScore.push(newTopScore)	}
        if(newTopScore.score > topScore[j].score)
		{var oldScore = topScore[j]
		topScore[j] = newTopScore
		newTopScore = oldScore
	}}}}}
}

function descscorelike(topScore){

	for(var n = 0 , i = 4 ; n < 5; n++, i--){
		var user = topScore[n]

		rankid[i].innerHTML = "Rank : "+ (n+1);
		nameid[i].innerHTML = user["username"];
		scoreid[i].innerHTML = user["score"] ;
		likeid[i].innerHTML =  user["likelove"]


	}

}


function showboard(data){
	var keys = Object.keys(data);

	var divTag = document.getElementById("RankB");
	for (var i = keys.length-1 , max = 4 ; i >=0  && max >= 0 ; i-- , max-- ) {

		var temp = document.createElement("div");
		temp.className = "newfeed2";
		divTag.appendChild(temp);

		var temp1 = document.createElement("div");
		temp1.id = "RankNum"+max;
		temp1.className = "RankNumClass";
		temp1.innerHTML = "RankNumClass"+max;
		temp.appendChild(temp1);

		rankid[max] = document.getElementById("RankNum"+max);


	}

	var divTag = document.getElementById("NameB");
	for (var i = keys.length-1 , max = 4 ; i >=0  && max >= 0 ; i-- , max-- ) {

		var temp = document.createElement("div");
		temp.className = "newsfeed2";
		divTag.appendChild(temp);

		var temp1 = document.createElement("div");
		temp1.id = "NameNum"+max;
		temp1.className = "NameClass";
		temp1.innerHTML = "NameNum"+max;
		temp.appendChild(temp1);

		nameid[max] = document.getElementById("NameNum"+max);

	}

	var divTag = document.getElementById("ScoreB");
	for (var i = keys.length-1 , max = 4 ; i >=0  && max >= 0 ; i-- , max-- ) {

		var temp = document.createElement("div");
		temp.className = "newsfeed2";
		divTag.appendChild(temp);

		var temp1 = document.createElement("div");
		temp1.id = "NumScore"+max;
		temp1.className = "ScoreClass";
		temp1.innerHTML = "ScoreB"+max;
		temp.appendChild(temp1);

		scoreid[max] = document.getElementById("NumScore"+max);

	}

	var divTag = document.getElementById("LikeB");
	for (var i = keys.length-1 , max = 4 ; i >=0  && max >= 0 ; i-- , max-- ) {

		var temp = document.createElement("div");
		temp.className = "newsfeed2";
		divTag.appendChild(temp);

		var temp1 = document.createElement("div");
		temp1.id = "likescore"+max;
		temp1.className = "likeClass";
		temp1.innerHTML = "likeClass"+max;
		temp.appendChild(temp1);

		likeid[max] = document.getElementById("likescore"+max);

	}


	var divTag = document.getElementById("LikePic");
	for (var i = keys.length-1 , max = 4 ; i >=0  && max >= 0 ; i-- , max-- ) {

		var temp = document.createElement("div");
		temp.id = "NumimgLike"+max;
		temp.className = "newsfeed2";
		divTag.appendChild(temp);

		var temp1 = document.createElement("img");
		temp1.src = ("Hololive/watalike.png");
		
		temp1.className = "AddlikeClass";
		temp.appendChild(temp1);


	}

	var divTag = document.getElementById("CommentPic");
	for (var i = keys.length-1 , max = 4 ; i >=0  && max >= 0 ; i-- , max-- ) {

		var temp = document.createElement("div");
		temp.id = "NumimgCommentPic"+max;
		temp.className = "newsfeed2";
		divTag.appendChild(temp);

		var temp1 = document.createElement("img");
		temp1.src = ("Hololive/Hololive_logo.svg.png");
		temp1.className = "CommentClass";
		temp.appendChild(temp1);

		
	}

	setLike();
	setComment();

}





function setComment(){
	NumimgCommentPic1
	Commentbutton[0] =  document.getElementById('NumimgCommentPic4');
    Commentbutton[0].addEventListener('click', () => { getData(topScore[0]); })

	Commentbutton[1] =  document.getElementById('NumimgCommentPic3');
	Commentbutton[1].addEventListener('click', () => {getData(topScore[1]); })

	Commentbutton[2] =  document.getElementById('NumimgCommentPic2');
    Commentbutton[2].addEventListener('click', () => { getData(topScore[2]); })

	Commentbutton[3] =  document.getElementById('NumimgCommentPic1');
	Commentbutton[3].addEventListener('click', () => {getData(topScore[3]); })

	Commentbutton[4] =  document.getElementById('NumimgCommentPic0');
	Commentbutton[4].addEventListener('click', () => {getData(topScore[4]); })


}

function setLike(){
	
	likebutton[0] =  document.getElementById('NumimgLike4');
    likebutton[0].addEventListener('click', () => { B_scorelike(topScore[0]); })

	likebutton[1] =  document.getElementById('NumimgLike3');
	likebutton[1].addEventListener('click', () => {B_scorelike(topScore[1]); })

	likebutton[2] =  document.getElementById('NumimgLike2');
    likebutton[2].addEventListener('click', () => { B_scorelike(topScore[2]); })

	likebutton[3] =  document.getElementById('NumimgLike1');
	likebutton[3].addEventListener('click', () => {B_scorelike(topScore[3]); })

	likebutton[4] =  document.getElementById('NumimgLike0');
	likebutton[4].addEventListener('click', () => {B_scorelike(topScore[4]); })
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





