const express = require('express'); // express 사용
const bodyParser = require('body-parser'); // body-parser 미들웨어
const socketio = require('socket.io');
const cors = require('cors');
const http = require('http');
const path = require('path');
//const server = require('http').Server(app)

const app = express();
const server = require('http').Server(app);
const io = socketio(server);
const PORT = process.env.PORT || 3030;  //3030 port 사용 

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

if(process.env.NODE_ENV === 'production') {  //AWS서버에서 돌아가면 빌드하기
  app.use(express.static(path.join(__dirname, "../client/build")));
  
  app.get('*', (req, res) => {
      req.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  })
};

app.use('/translate', express.static(path.join(__dirname, "../client/translate")));


// 해당 포트로 서버를 실행
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));