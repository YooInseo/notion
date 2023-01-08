import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

/**
 * MYSQL Connect function
 * @returns connection
 */
export function connect(){
    const connection = mysql.createConnection({
        host: process.env.HOST,
        port: process.env.PORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    });
 
    connection.connect();
    console.log("MYSQL 접속");
    return connection;
}

export function insert(connection, email){
    const sql = `INSERT INTO user_login (user_email) VALUE (${email})`;

    console.log(`${connection} 에서 ${sql} 실행`);
    console.log("test");
    
    connection.query(sql,function (err, result) {
        if (err){
            console.log(err);
            return false;
        }
        return true;
    });
}
    
export default {connect, insert};