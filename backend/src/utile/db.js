// const mysql = require("mysql");
const mysql = require('mysql2');


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"pos",
    port:"3306",
    dateStrings: 'don'

})

module.exports=db;