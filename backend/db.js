const mysql = require("mysql2");

const pool = mysql.createPool({

    host: "mysql",

    user: "root",

    password: "root123",

    database: "campusdb",

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0

});

pool.getConnection((err, connection) => {

    if(err){

        console.log("Database Connection Failed");
        console.log(err);

    }
    else{

        console.log("MySQL Connected");

        connection.release();

    }

});

module.exports = pool;