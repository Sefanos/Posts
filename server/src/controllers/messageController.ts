import { Request , Response , NextFunction } from "express";
import Message ,{Imessages} from "../models/Messages";


export const fetchMassages = async (req: Request , res: Response , next : NextFunction) =>{
    try {
        const messages : Imessages[] = await Message.find().populate('author', '-password');
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({error})
        next(error);
    }
}

export const addMessage = async (req: Request, res: Response, next: NextFunction) => {
    const { title, message }: { title: string, message: string } = req.body;
    
    if(!title || !message){
        return res.status(400).json({Error : 'Invalid input' })
    }

    try {
        console.log('Token from cookies:', res.locals.user);
        // Create a new instance of the Message model
        const doc: Imessages = new Message({ title, message, author: res.locals.user._id });
        const newMessage = await doc.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'Internal Server Error' });
        next();
    }
};


export const deleteMessage =  async (req: Request , res: Response , next : NextFunction) =>{
    const MessageId = req.params.id; 

    try {
        const goneMessage = await Message.findOneAndDelete({_id : MessageId})
        if (goneMessage) {
            // Message found and deleted successfully
            res.status(200).json({ message: 'Message deleted successfully' , goneMessage});
        } else {
            // Message not found with the provided ID
            res.status(404).json({ error: 'Message not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' })
        next(error);
    }
}