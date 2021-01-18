// 필요한 모듈들을 가져온다
const express = require("express");
const bodyParser = require("body-parser");

const db = require("./db");

// Express 서버를 생성
const app = express();

// json 형태로 오는 요청의 본문을 해석해 줄 수 있게 등록
app.use(bodyParser.json());

// // table 생성
// db.pool.query(`CREATE TABLE lists (
//     id INTEGER AUTO_INCREMENT,
//     value TEXT,
//     PRIMARY KEY (id)
// )`, (err, results, fileds) => {
//     console.log('results', results);
// });

// DB lists 테이블에 있는 모든 데이터를 프론트 서버에 보낸다
app.get('/api/values', (req, res) => {
    // DB 에서 모든 정보 가져온다
    db.pool.query('SELECT * FROM lists;', (err, results, fileds) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.json(results);
        }
    });
});

// client 에서 입력한 값을 DB 의 lists 테이블에 넣어주기
app.post('/api/value', (req, res, next) => {
    // DB에 값 넣어주기
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`, (err, result, fileds) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.json({ success: true, value: req.body.value });
        }
    });
});

app.listen(5000, () => {
    console.log('server is running on port 5000');
});