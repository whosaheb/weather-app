const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");


const pool = mysql.createPool({
    connectionLimit: 10,    
    password: dbConfig.PASSWORD,
    user: dbConfig.USER,
    database: dbConfig.DB,
    host: dbConfig.HOST,
    port: dbConfig.PORT  
}); 

dbQuery = (sql) =>{
    return new Promise((resolve, reject)=>{
        pool.query(sql,  (error, results)=>{
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });
};

pool.getConnection(function(err, connection) {
  if (err) throw err; // not connected!

  // Use the connection
  connection.query(
      "CREATE TABLE IF NOT EXISTS `saheb_sqldb`.`weather_report` ( `id` INT NOT NULL AUTO_INCREMENT , `state` VARCHAR(126) NOT NULL , `temp` FLOAT NOT NULL , `pressure` INT(16) NOT NULL , `humidity` INT(16) NOT NULL , `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , `modified_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE = InnoDB;", 
      function (error, results, fields) {
        // When done with the connection, release it.
        connection.release();

        // Handle error after the release.
        if (error) throw error;
        console.log("Database connection working properly.");
    // Don't use the connection here, it has been returned to the pool.
  });
});

module.exports = dbQuery;
