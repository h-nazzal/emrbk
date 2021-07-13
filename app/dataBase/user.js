const express = require('express');
const mysql = require('mysql');
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
const db2 = mysql.createConnection({
    host     : 'remotemysql.com',
    user     : 'CSFcE5yL7Y',
    password : 'FK8npv2oee',
    port : '3306',
    database: 'CSFcE5yL7Y',
   
});
db2.connect((err) => {
  if(err){
      throw err;
  }
  console.log('MySql Connected2...');

});
/*
//
the new recorder will check by between start and end date;
*/ 
function handleDisconnect() {

db2.on('error', function(err) {
  console.log('db error', err);
  if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
    handleDisconnect();                         // lost due to either server restart, or a
  } else {  
    console.log("from err")                                    // connnection idle timeout (the wait_timeout
    throw err;                                  // server variable configures this)
  }
});

}
handleDisconnect();
module.exports = db2;