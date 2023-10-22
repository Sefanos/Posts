import express from 'express';
import { fetchMassages ,addMessage , deleteMessage } from '../controllers/messageController';
import { checkCurrent, requireAuth } from '../middleware/CheckAuth';

const router = express.Router();

// GET request to fetch all Messages
router.get('/' , fetchMassages);


// POST request to add new message
router.post('/add_Message', checkCurrent ,addMessage)

//Delete request 
router.get('/:id' , deleteMessage)

export default router;