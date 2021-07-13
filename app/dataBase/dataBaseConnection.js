const express = require('express')
const mysql = require('mysql')
// https://www.phpmyadmin.co/
// Create connection
/*
You have successfully created a new database. The details are below.

Username: CSFcE5yL7Y

Database name: CSFcE5yL7Y

Password: FK8npv2oee

Server: remotemysql.com

Port: 3306

These are the username and password to log in to your database and phpMyAdmin

*/

/*
var mysql = require('mysql');
var pool  = mysql.createPool({
  host     : 'remotemysql.com',
  user     : '9xLrCX8r7m',
  password : 'QlkietjIvp',
  database: '9xLrCX8r7m',
   port : '3306',

});

exports.getUsers = function(callback) {
  pool.getConnection(function(err, connection) {
    if(err) { 
      console.log(err); 
      callback(true); 
      return; 
    }
    var sql = "SELECT id,name FROM users";
    connection.query(sql, [], function(err, results) {
      connection.release(); // always put connection back in pool after last query
      if(err) { 
        console.log(err); 
        callback(true); 
        return; 
      }
      callback(false, results);
    });
  });
});
var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

*/

// const db2 = mysql.createConnection({
//     host     : 'remotemysql.com',
//     user     : '9xLrCX8r7m',
//     password : 'QlkietjIvp',
//     port : '3306',
//     database: '9xLrCX8r7m',

// });
// db2.connect((err) => {
//   if(err){
//       throw err;
//   }
//   console.log('MySql Connected...');

// });
// /*
// //
// the new recorder will check by between start and end date;
// */
// function handleDisconnect() {

// db2.on('error', function(err) {
//   console.log('db error', err);
//   if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
//     handleDisconnect();                         // lost due to either server restart, or a
//   } else {
//     console.log("from err")                                    // connnection idle timeout (the wait_timeout
//     throw err;                                  // server variable configures this)
//   }
// });

// }
// handleDisconnect();
var db2
var pool = mysql.createPool({
  HOST: 'bors1xaysbbbx0yiipww-mysql.services.clever-cloud.com',
  USER: 'uttntpsvobkaxgyk',
  PASSWORD: 'n6dXeYhOfwwt2Wfykfui',
  DB: 'bors1xaysbbbx0yiipww',
  dialect: 'mysql',
  port: '3306'
})

pool.getConnection(function (err, connection) {
  if (err) {
    console.log(err)
    return
    callback(true)
  }

  db2 = connection

  db2.query('SELECT * from `sessions`', function (err, result) {})
  console.log('MySql Connected...')
})

module.exports = pool
