import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const db=mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect((error)=>{
    if(error){
        console.error('Database connection failed:', error);
    }else{
        console.log('Connected to the database.');
    }});

export default db;
