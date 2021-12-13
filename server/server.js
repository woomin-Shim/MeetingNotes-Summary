const express = require('express'); // express 사용
const bodyParser = require('body-parser'); // body-parser 미들웨어
const socketio = require('socket.io');
const cors = require('cors');
const http = require('http');
const path = require('path');
const mysql = require('mysql');
const spawn = require('child_process').spawn;
//const spawn = require('child-process').spawn; 
//const server = require('http').Server(app)


const app = express();
const server = require('http').Server(app);
const io = socketio(server);
const PORT = process.env.PORT || 3030;  //3030 port 사용 
//const textArray = [];
//const textInput;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

if(process.env.NODE_ENV === 'production') {  //AWS서버에서 돌아가면 빌드하기
  app.use(express.static(path.join(__dirname, "../client/build")));
  
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  })
};


/********************  DB ***************************/
const conn = {
  host : 'localhost',
  port : '3306',
  user : 'root',
  password : '',
  database : 'meeting'
};

mysqlDB = mysql.createConnection(conn);


/*************** socket connection *************************** */
io.on('connection', (socket) => {
  console.log('connection success');
  var textArray = [];
  
  socket.on('message', (data) => {
    
    textArray.push(data.message);
    console.log(data.message);
  })

  socket.on('disconnect', () => {
    console.log('connection end');
    //console.log(textArray);

    var textInput = [];
    textInput = textArray.toString();  // conversion Array to string 
    //textArray = [];
    console.log(textInput);
    

    var sql = 'INSERT INTO script VALUE(?)';
    mysqlDB.query(sql, [textInput], function (err, results) {
      if(err) console.log(err);
      else {
        console.log('DB INPUT Success');
      }
    })

    

    //python 연동 
    const summary = spawn('python', ['./finalSummary.py', textInput]);

    

    //const ex = spawn('python', ['./print.py', textInput]);

    
    summary.stdout.on('data', function(data) {
      var summaryResult = data.toString('utf8');
      console.log('요약 : ' + summaryResult);

      
      sql = 'INSERT INTO summary_tbl VALUE(?)';
      mysqlDB.query(sql, [summaryResult], function (err, results) {
        if(err) console.log(err);
        else {
        console.log('SUMMARY INPUT Success');
      }
      })
      
      
    })
    
    summary.stderr.on('data', function(data) {
      console.log('Error Occur');
    })

    /*
      ex.stdout.on('data', function(data) {
      var result = data.toString('utf8')
      console.log(result);
    })
    */
  })
});

app.get('/result', function(req, res) {
 //var sql = 'SELECT * FROM script';
 var sql = 'SELECT * FROM summary_tbl';
 mysqlDB.query(sql, function(err, results) {
   if(err) {
     return res.send({ code:10, msg: `${err}`});
   }
   else {
    //var script = results[0].contents.replace(/,/g, '\n'); // DB안에 contents 
    var summary = results[0].summary.replace(/\r\n/g, '\n'); // DB안에 contents 
    console.log('Send to client success');
    res.send({ code:0, msg: 'request success', script:summary });   
    sql = 'DELETE FROM script';
    mysqlDB.query(sql, function(err, results) {
      if(err) {
        return res.send({ code:10, msg: `${err}`});
      }
      else {
       console.log('Delete from script Success');
      }
    })

    sql = 'DELETE FROM summary_tbl';
    mysqlDB.query(sql, function(err, results) {
      if(err) {
        return res.send({ code:10, msg: `${err}`});
      }
      else {
       console.log('Delete from sumaary_tbl Success');
      }
    })
   }
 })
});

//app.use('/translate', express.static(path.join(__dirname, "../client/translate")));


// 해당 포트로 서버를 실행
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));