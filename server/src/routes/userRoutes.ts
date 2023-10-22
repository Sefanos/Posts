import express from 'express';
import {getUsers , signIn , signUp ,logout } from '../controllers/userController';

const router = express.Router();

// GET request to fetch all users
router.get('/', getUsers);

// POST request to create a new user
router.post('/signIn', signIn);

router.post('/signUp' ,signUp );

router.get('/logout' ,logout );

export default router;
