const express = require('express');
const app = express();
const fs = require('fs');
const hostname = 'localhost';
const port = 3000;
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "Databasetable"
})

con.connect(err => {
  if(err) throw(err);
  else{
      console.log("MySQL connected");
  }
})

const queryDB = (sql) => {
  return new Promise((resolve,reject) => {
      // query method
      con.query(sql, (err,result, fields) => {
          if (err) reject(err);
          else
              resolve(result)
      })
  })
}


app.get('/loadstoredatainuserid', async (req, res) => {

  let sql_storedata = "CREATE TABLE IF NOT EXISTS userInfo (id INT AUTO_INCREMENT PRIMARY KEY, reg_date TIMESTAMP, username VARCHAR(255),password VARCHAR(100),score Int,likelove Int)"
  let result_storedata = await queryDB(sql_storedata);
  result_storedata = await queryDB(sql_storedata);
  // sql_storedata = `SELECT item_name FROM ${tablename_storedata}`;
  let sedata = `SELECT  msg_Id FROM userInfo`;
  sedata = await queryDB(sedata);

  if(sedata == ''){
      readjson().then(UpdatestoreUserdb).then((out) => out);
      
  }
  console.log("Getcomplete")
  return res.send(sedata);
});

// app.get('/loadstoredatainmsgid', async (req, res) => {

//   let sql_storedata = "CREATE TABLE IF NOT EXISTS msgInfo (msg_id INT AUTO_INCREMENT PRIMARY KEY, user VARCHAR(255), message VARCHAR(100))";
//   let result_storedata = await queryDB(sql_storedata);
//   result_storedata = await queryDB(sql_storedata);
//   // sql_storedata = `SELECT item_name FROM ${tablename_storedata}`;
//   let sedata = `SELECT  msg_Id FROM msgInfo`;
//   sedata = await queryDB(sedata);

//   if(sedata == ''){
//       readjson().then(Updatestorepostdb).then((out) => out);
      
//   }
//   console.log("Getcomplete")
//   return res.send(sedata);
// });




 app.get('/register', async (req,res) => {
    return res.redirect('register.html');
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

    let sql_loing = "CREATE TABLE IF NOT EXISTS userInfo (id INT AUTO_INCREMENT PRIMARY KEY ,username VARCHAR(255),password VARCHAR(100),score Int,likelove Int)"
    sql_loing = await queryDB(sql_loing);
    let sql = `SELECT id, username, password, score,likelove FROM userInfo`;
    result = await queryDB(sql);

    let msgloing = "CREATE TABLE IF NOT EXISTS msginfo (id INT AUTO_INCREMENT PRIMARY KEY ,username VARCHAR(255),message VARCHAR(100))"
    msgloing = await queryDB(msgloing);



    result = Object.assign({},result);
    // console.log(result);
    const username = req.body.username;
    const password = req.body.password;

    var Obj = Object.keys(result);
    var isCorrect = false;
    for(var i = 0 ; i < Obj.length ; i++){
        var temp = result[Obj[i]];
        var dataUsername = temp.username;
        var dataPassword = temp.password;
        if(dataUsername == username && dataPassword == password ){
            isCorrect = true;
            res.cookie('username', username);
        }
    }
    if(isCorrect == true){
        console.log("Correct");
        return res.redirect('feed.html');
        // return res.redirect('register.html');
    }
    else{
        console.log("Wrong");
        return res.redirect('index.html?error=1');
    }
  })
  

  app.post('/regisDB', async (req,res) => {

    if (req.body.password != req.body.confirmpassword) {
      return res.redirect('register.html?error=1');
    }

    let sql_loing = "CREATE TABLE IF NOT EXISTS userInfo (id INT AUTO_INCREMENT PRIMARY KEY ,username VARCHAR(255),password VARCHAR(100),score Int,likelove Int)"
    sql_loing = await queryDB(sql_loing);

    
    sql = `INSERT INTO userInfo (username,password,score,likelove) VALUES ("${req.body.username}", "${req.body.password}",'0','0')`;
    result = await queryDB(sql);
    
    console.log("New record created successfullyone");
    return res.redirect('index.html');

})

const readjsonUserdb = () => {
  return new Promise((resolve,reject) => {
      fs.readFile('js/userDB.json','utf8',(err,data) => {
        if(err)
          reject(err);
        else{
          resolve(data);
        }
      });
  })
}

const readjsonpostdb = () => {
  return new Promise((resolve,reject) => {
      fs.readFile('js/postDB.json','utf8',(err,data) => {
        if(err)
          reject(err);
        else{
          resolve(data);
        }
      });
  })
}




const UpdatestoreUserdb =  (data) =>{
  return new Promise((resolve,reject) => {
        var storejson = JSON.parse(data);
        var keys = Object.keys(storejson);

        let sql_storedata =  `SELECT username,password,score,likelove FROM storedata`;
        sql_storedata =  queryDB(sql_storedata);
        for(i = 0;i < keys.length; i ++ ){
            
          let sql_storedata =  `INSERT INTO storedata (username,password,score,likelove) VALUES ("${storejson[keys[i]].username}", "${storejson[keys[i]].password}","${storejson[keys[i]].score}","${storejson[keys[i]].likelove}")`; 
          sql_storedata =  queryDB(sql_storedata);          
      }
      resolve(sql_storedata);
  })
}

const Updatestorepostdb =  (data) =>{
  return new Promise((resolve,reject) => {
        var storejson = JSON.parse(data);
        var keys = Object.keys(storejson);

        let sql_storedata =  `SELECT user, message FROM storedata`;
        sql_storedata =  queryDB(sql_storedata);
        for(i = 0;i < keys.length; i ++ ){
            
          let sql_storedata =  `INSERT INTO storedata (user,message) VALUES ("${storejson[keys[i]].user}", "${storejson[keys[i]].price}","${storejson[keys[i]].description}","${storejson[keys[i]].pic}")`; 
          sql_storedata =  queryDB(sql_storedata);          
      }
      resolve(sql_storedata);
  })
}






app.get('/readPost', async (req,res) => {
  
    let msg_read = `SELECT user, message FROM msgInfo`;
    let result = await queryDB(msg_read);
    result = Object.assign({},result);
    var Json = JSON.stringify(result);
    res.json(Json);

})

app.post('/writePost',async (req,res) => {

  const newMsg = req.body;
  console.log(newMsg);
  var keys = Object.keys(newMsg);
  
  let sql_msg = "CREATE TABLE IF NOT EXISTS msgInfo (msg_id INT AUTO_INCREMENT PRIMARY KEY, user VARCHAR(255), message VARCHAR(100))";
  let result_msg = await queryDB(sql_msg);
  sql_msg = `INSERT INTO msgInfo (user, message) VALUES ("${newMsg[keys[0]]}", "${newMsg[keys[1]]}")`;
  result_msg = await queryDB(sql_msg);
  res.json(result_msg);
  
})


app.post('/writeGameArray',async (req,res) => {

  const newMsg = req.body;
  //console.log("writeGameArray :"+newMsg);

  var keys = Object.keys(newMsg);
  
  let sql_loing = "CREATE TABLE IF NOT EXISTS gameInfo (id INT AUTO_INCREMENT PRIMARY KEY ,word VARCHAR(100),imgshadow VARCHAR(100),imgend VARCHAR(100),hint VARCHAR(100)) "
  sql_loing = await queryDB(sql_loing);

  // sql_msg = `INSERT INTO gameInfo (word, imgshadow,imgend,hint) VALUES ("${newMsg.words}",'avatar.png','avatar.png',"${newMsg.words}")`;
  // result_msg = await queryDB(sql_msg);
  
  res.json(result_msg);
  
})



app.get('/readboard', async (req,res) => {

  let msg_read = `SELECT username,password,score,likelove FROM userinfo`;
  let result = await queryDB(msg_read);
  result = Object.assign({},result);
  var Json = JSON.stringify(result);
  res.json(Json);

})

app.post('/writeboard',async (req,res) => {

      const newMsg = req.body;
    console.log(newMsg);
    var keys = Object.keys(newMsg);
    
    let sql_msg = "CREATE TABLE IF NOT EXISTS msgInfo (msg_id INT AUTO_INCREMENT PRIMARY KEY, user VARCHAR(255),password VARCHAR(100), score Int, likelove Int)";
    let result_msg = await queryDB(sql_msg);
    sql_msg = `INSERT INTO msgInfo (username,password,score,likelove) VALUES ("${result[obj[0]].user}","${result[obj[0]].password}","${result[obj[0]].score}","${result[obj[0]].likelove}")`;
    result_msg = await queryDB(sql_msg);
    res.json(result_msg);

})


app.post('/savescoreword',async (req,res) => {


    const newMsg = req.body;

    let sql_msg = "CREATE TABLE IF NOT EXISTS msgInfo (msg_id INT AUTO_INCREMENT PRIMARY KEY, user VARCHAR(255),password VARCHAR(100), score Int, likelove Int)";
    let result_msg = await queryDB(sql_msg);

    sql_msg = `UPDATE userInfo SET score = '${newMsg.score}' WHERE username = '${newMsg.user}'`;
    result_msg = await queryDB(sql_msg);

    res.json(result_msg);

  })





  app.post('/writeLikeScore',async (req,res) => {

    // const newScore = req.body
    // let user_read = await readJson('js/userDB.json');
    // let jsonUser = await JSON.parse(user_read)
    // var Obj = Object.keys(jsonUser);
  
    // for(var i=0; i < Obj.length;i++){

    //   if(newScore.user == jsonUser[Obj[i]].username)
    //   {   jsonUser[Obj[i]].likelove = newScore.like;  }
    // }

    // var newJsonUser = JSON.stringify(jsonUser);
    // let newUser_read = await writeJson(newJsonUser,'js/userDB.json')
    // res.json(newUser_read);

    const newMsg = req.body;
    console.log(newMsg);

    let sql_msg = "CREATE TABLE IF NOT EXISTS msgInfo (msg_id INT AUTO_INCREMENT PRIMARY KEY, user VARCHAR(255),password VARCHAR(100), score Int, likelove Int)";
    let result_msg = await queryDB(sql_msg);

    sql_msg = `UPDATE userInfo SET likelove = '${newMsg.like}' WHERE username = '${newMsg.user}'`;
    result_msg = await queryDB(sql_msg);

    res.json(result_msg);
    
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
