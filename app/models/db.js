import mysql from 'mysql';
import dbConfig from '../config/db.config.js';

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user:dbConfig.USER,
    password:dbConfig.PASSWORD,
    database:dbConfig.DB
})

connection.connect((error)=>{
    if(error) throw error
    console.log('Conexión Exitosa!')
})

export default connection;