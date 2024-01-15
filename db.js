let db = null;

function setDB(connection) {
    db = connection;
}

function getDB() {
    if (!db) throw new Error('DB 연결이 설정되지 않았습니다.');
    return db;
}

module.exports = {db , setDB, getDB };