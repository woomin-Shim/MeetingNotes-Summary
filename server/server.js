const express = require('express'); // express 사용
const bodyParser = require('body-parser'); // body-parser 미들웨어
const socketio = require('socket.io');
const cors = require('cors');
const http = require('http');
const path = require('path');
const mysql = require('mysql');
const spawn = require('child_process').spawn;
//const server = require('http').Server(app)

const app = express();
const server = require('http').Server(app);
const io = socketio(server);
const PORT = process.env.PORT || 3030;  //3030 port 사용 
const textArray = [];

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

if(process.env.NODE_ENV === 'production') {  //AWS서버에서 돌아가면 빌드하기
  app.use(express.static(path.join(__dirname, "../client/build")));
  
  app.get('*', (req, res) => {
      req.sendFile(path.join(__dirname, '../client/build', 'index.html'));
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

  socket.on('message', (data) => {
    textArray.push(data.message);
    console.log(data.message);
  })

  socket.on('disconnect', () => {
    console.log('connection end');
    //console.log(textArray);

    const textInput = textArray.join();  // conversion Array to string 
    console.log(textInput);

    var sql = 'INSERT INTO script VALUE(?)';
    mysqlDB.query(sql, [textInput], function (err, results) {
      if(err) console.log(err);
      else {
        console.log('DB INPUT Success');
      }
    })

    //python 연동 
    const summary = spawn('python', ['summary.py', textInput]);

    summary.stdout.on('data', function(result, error) {
      if(error) {
        console.log('error occur!!');
      }

      var summaryResult = result.toString('utf8');
      console.log('요약 결과 : ' + summaryResult);
    })
  })
});

//app.use('/translate', express.static(path.join(__dirname, "../client/translate")));


// 해당 포트로 서버를 실행
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));