import {Request, Response, NextFunction } from 'express';
import { MyJwtSecret } from '../controllers/userController';
import User from '../models/User';
import jwt from 'jsonwebtoken';


export const requireAuth = (req : Request , res : Response , next : NextFunction)=>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token , MyJwtSecret ,(err: any , decodedToken: any)=>{
            if(err){
                console.log(err.message)
                res.redirect('/signIn');
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }else{
        res.redirect('/signIn');
    }
}

export const checkCurrent =  (req : Request , res : Response , next : NextFunction)=>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token , MyJwtSecret ,async (err: any , decodedToken: any)=>{
            if(err){
                console.log(err.message)
                res.locals.user = null ;

            }else{
                const user = await User.findById(decodedToken.id).select('-password');
                res.locals.user = user ;
                next();
            }
        })
    }else{
        res.status(500).send('No Cookie')
        res.locals.user = null ;
    }
}