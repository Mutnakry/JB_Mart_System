// // // const mysql = require("mysql");
// // const mysql = require('mysql2');


// // const db = mysql.createConnection({
// //     host:"localhost",
// //     user:"root",
// //     password:"",
// //     database:"pos",
// //     port:"3306",
// //     dateStrings: 'don'

// // })

// // module.exports=db;



// // Ensure mysql2 is imported only once
// const mysql = require('mysql2');

// // Using createPool is recommended over createConnection for better management
// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'pos',
//     port: '3306',
//     dateStrings: true,
//     connectionLimit: 10,
// });

// // Export the pool instead of a single connection
// module.exports = db;




const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env


// Using createPool is recommended over createConnection for better management
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    dateStrings: true,
    connectionLimit: 10,
});

module.exports = db;