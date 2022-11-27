const mysql = require("mysql");

const dbConfig = require("../config/dbConfig");
const connection = mysql.createConnection({
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.database,
    user: dbConfig.user, 
    password: dbConfig.password,
    multipleStatements: true,
    connectionLimit: 15,
    queueLimit: 30,
    acquireTimeout: 1000000,
});
connection.connect(function (err) {
    if(err){
        console.log("error occurred while connecting", err);
    }
    else{
        console.log("connection created with Mysql successfully");
    }
 });
 module.exports = connection;