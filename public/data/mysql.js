import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

export function connect(){
    const connection = mysql.createConnection({
        host: process.env.HOST,
        port: process.env.PORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    });
    connection.connect();
    return connection;
}
    
export default {connect};