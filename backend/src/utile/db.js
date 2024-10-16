const mysql = require("mysql");

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"pos",
    port:"3306",
    dateStrings: 'don'

})

module.exports=db;