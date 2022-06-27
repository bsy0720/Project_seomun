const mysql =  require('mysql');
const connection = mysql.createConnection({
    host : 'us-cdbr-east-05.cleardb.net',
    user : 'bd6ca3c453bf6b',
    password : '471f9875',
    port : '3306',
    database : 'heroku_a691fd3c143f18c',
    dateStrings : 'date'
});

//리스트 전체 부르기
function getAllMemos(callback) {
    connection.query('SELECT * FROM (SELECT *, @rownum:=@rownum+1 AS RNUM FROM seomun, (SELECT @rownum :=0 as R)NUM)SUB ORDER BY id DESC;', (err, rows, fields) => {
        if(err) throw err;
        callback(rows);
    });
}

// 새로운 내용추가
function insertMemo(title, pw, content, callback) {
    connection.query(`INSERT INTO seomun (title, pw, s_update, content) VALUES ('${title}', '${pw}', NOW(), '${content}')`, (err,result) => {
        if(err) throw err;
        callback();
    });    
}

// id값과 일치하는 row만 불러오기
function getMemoById(id, callback) {
    connection.query(`select * from seomun WHERE id = '${id}'`, (err, row, fields) => {
        if(err) throw err;
        callback(row);
    });
}

// id 값과 일치하는 부분 수정 함수 
function updateMemoById(id, title, pw, s_update, content, callback) {
    connection.query(`UPDATE seomun set id = '${id}', title = '${title}', pw = '${pw}', s_update ='${s_update}', content = '${content}' WHERE id = ${id}`, (err, result) => {
        if(err) throw err;
        callback()
    });
}

// id값과 일치하는 부분 삭제
function deleteMemoById(id, callback) {
    connection.query(`DELETE FROM seomun WHERE id = '${id}'`, (err, result) => {
        if(err) throw err;
        callback();
    });
}

module.exports = {
    getAllMemos,
    insertMemo,
    getMemoById,
    updateMemoById,
    deleteMemoById
};