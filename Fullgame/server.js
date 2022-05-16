const express = require('express');
const app = express();
const fs = require('fs');
const hostname = 'localhost';
const port = 3000;
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const e = require('express');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


 app.get('/register', async (req,res) => {
    return res.redirect('register.html');
  })

  
  app.post('/regisDB', async (req,res) => {
    let userData = await readJson('js/userDB.json');
    let userJson = await JSON.parse(userData);
    var keys = Object.keys(userJson);
  
    const newUser = req.body;
    const username = newUser.username;
    const password = newUser.password[0];
    const score = 0;
    const likelove = 0;

  
    for(var i = 0 ; i < keys.length ; i++){
      if(userJson[keys[i]].username == username){
        return res.redirect('register.html?error=2');
      }
    }
  
    if(password == newUser.password[1]){
        var index = keys.length + 1;
        var dataUser = {"username":username,"password":password,"score":score,"likelove":likelove};
        userJson["user"+ index] = dataUser;
        var newJsonUser = JSON.stringify(userJson);
        let writeNewUserJson = await writeJson(newJsonUser,'js/userDB.json');
        
        return res.redirect('index.html');
    }else{
        return res.redirect('register.html?error=1');
    }
    
  })
  
  app.get('/logout', (req,res) => {
    res.clearCookie('username');
    return res.redirect('index.html');
  })
  
  app.get('/playgame', (req,res) => {
    return res.redirect('game.html');
  })
  
  app.get('/feed', (req,res) => {
    return res.redirect('feed.html');
  })


  app.post('/checkLogin',async (req,res) => {

    let userData = await readJson('js/userDB.json');
    let userJson = await JSON.parse(userData);
    const username = req.body.username;
    const password = req.body.password;
    var keys = Object.keys(userJson);
    var isCorrect = false;
    for(var i = 0 ; i < keys.length ; i++){
        if(userJson[keys[i]].username == username && userJson[keys[i]].password == password ){
            isCorrect = true;
            res.cookie('username', username);
        }
    }

    if(isCorrect == false){
        return res.redirect('index.html?error=1');
    }else if(isCorrect == true){
        return res.redirect('feed.html');
    }
  })
  

app.get('/readPost', async (req,res) => {
    let msg_read = await readJson('js/postDB.json');
    res.json(msg_read);
})

app.post('/writePost',async (req,res) => {
    const newMsg = req.body
    let msg_read = await readJson('js/postDB.json');
    let jsonMsg = await JSON.parse(msg_read)
    var Obj = Object.keys(jsonMsg);
    var index = Obj.length + 1;
    console.log(Obj);
    jsonMsg["post"+index] = newMsg;
    console.log(jsonMsg);
    var newJsonMsg = JSON.stringify(jsonMsg);
    let newMsg_read = await writeJson(newJsonMsg,'js/postDB.json')
    res.json(newMsg_read);
})

app.get('/readboard', async (req,res) => {
    let msg_read = await readJson('js/userDB.json');
    res.json(msg_read);
})

app.post('/writeboard',async (req,res) => {
    const newMsg = req.body
    let msg_read = await readJson('js/postDB.json');
    let jsonMsg = await JSON.parse(msg_read)
    var Obj = Object.keys(jsonMsg);
    var index = Obj.length + 1;
    console.log(Obj);
    jsonMsg["post"+index] = newMsg;
    console.log(jsonMsg);
    var newJsonMsg = JSON.stringify(jsonMsg);
    let newMsg_read = await writeJson(newJsonMsg,'js/postDB.json')
    res.json(newMsg_read);
})



app.post('/checkLogin',async (req,res) => {

    let userData = await readJson('js/userDB.json');
    let userJson = await JSON.parse(userData);
    const username = req.body.username;
    const password = req.body.password;
    var Obj = Object.keys(userJson);
    var isCorrect = false;
    for(var i = 0 ; i < Obj.length ; i++){
        if(userJson[Obj[i]].username == username && userJson[Obj[i]].password == password ){
            isCorrect = true;
            res.cookie('username', username);
            res.cookie('img', userJson[Obj[i]].img);
        }
    }

    if(isCorrect = true){
        console.log("Correct");
        return res.redirect('feed.html');
    }
    else{
        console.log("Worng");
        return res.redirect('index.html?error=1');
    }

})


app.post('/savescoreword',async (req,res) => {

    const newScore = req.body
    let user_read = await readJson('js/userDB.json');
    let jsonUser = await JSON.parse(user_read)
    var Obj = Object.keys(jsonUser);
  
    for(var i=0; i < Obj.length;i++){
      if(newScore.user == jsonUser[Obj[i]].username){

        if(newScore.score > jsonUser[Obj[i]].score)
        { jsonUser[Obj[i]].score = newScore.score }
        
      }
    }
    var newJsonUser = JSON.stringify(jsonUser);
    let newUser_read = await writeJson(newJsonUser,'js/userDB.json')
    res.json(newUser_read);
  })

  app.post('/writeLikeScore',async (req,res) => {

    const newScore = req.body
    let user_read = await readJson('js/userDB.json');
    let jsonUser = await JSON.parse(user_read)
    var Obj = Object.keys(jsonUser);
  
    for(var i=0; i < Obj.length;i++){

      if(newScore.user == jsonUser[Obj[i]].username)
      {   jsonUser[Obj[i]].likelove = newScore.like;  }
    }

    var newJsonUser = JSON.stringify(jsonUser);
    let newUser_read = await writeJson(newJsonUser,'js/userDB.json')
    res.json(newUser_read);
  })




const readJson = (file_name) => {
    return new Promise((resolve,reject) => {
        fs.readFile(file_name,'utf8',(err,data) => {
          if(err){
            reject(err);
          }
          else{
            resolve(data);
          }
        });
    })
}


const writeJson = (data,file_name) => {
    return new Promise((resolve,reject) => {
        fs.writeFile(file_name,data,(err) => {
          if(err){
            reject(err);
          }
          else{
            resolve("save message");
          }
    })
        
})};



 app.listen(port, hostname, () => {
        console.log(`Server running at   http://${hostname}:${port}/`);
});
