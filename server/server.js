const express = require('express'); // express 사용
const app = express();
const bodyParser = require('body-parser'); // body-parser 미들웨어 
const PORT = process.env.PORT || 3030;  //3030 port 사용 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get('/api/load', (req, res) => {
  res.send({ name: '우민', age:27 });
});


// 해당 포트로 서버를 실행
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});