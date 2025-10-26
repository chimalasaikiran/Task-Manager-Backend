import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from '../config/db.js';

const jwt_secret = process.env.JWT_SECRET;
const jwt_expires_in = process.env.JWT_EXPIRES_IN;

//signup controller
export const signup = async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {name,email,password} = req.body;
    //check if user already exists
    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkUserQuery,[email],async (err,results)=>{
        if(err){
            return res.status(500).json({message:'Database error',error:err});
        }
        if(results.length > 0){
            return res.status(400).json({message:'User already exists'});
        }
        //hash password
        try {
            const hashedPassword = await bcrypt.hash(password,10);
            //insert user into database
            const insertUserQuery = 'INSERT INTO users (name,email,password) VALUES (?,?,?)';
            db.query(insertUserQuery,[name,email,hashedPassword],(err,results)=>{
                if(err){
                    return res.status(500).json({message:'Database error',error:err});
                }
                const userId = results.insertId;
                //generate JWT token
                const token = jwt.sign({id:userId,email},jwt_secret,{expiresIn:jwt_expires_in});
                return res.status(201).json({message:'User registered successfully',token});
            });
        } catch (error) {
            return res.status(500).json({message:'Error hashing password',error});
        }

    });
};


//login controller
export const login =(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password} = req.body;
    //check if user exists
    const getUserQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(getUserQuery,[email],async (err,results)=>{
        if(err){
            return res.status(500).json({message:'Database error',error:err});
        }
        if(results.length === 0){
            return res.status(400).json({message:'Invalid email or password'});
        }
        const user = results[0];
        //compare password
        try {
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(400).json({message:'Invalid email or password'});
            }
            //generate JWT token
            const token = jwt.sign({id:user.id,email},jwt_secret,{expiresIn:jwt_expires_in});
            return res.status(200).json({message:'Login successful',token});
        }
        catch (error) {
            return res.status(500).json({message:'Error comparing passwords',error});
        }
    });
};
