import { Request, Response } from 'express';
import jwt from 'jsonwebtoken' ;
import User, { IUser } from '../models/User';


const expiration = 3 * 24 *60 *60 ;
export const MyJwtSecret : string = process.env.SECRET_KEY ?? 'defaultSecretKey'
const createToken = (id : string) => {
    return jwt.sign({id} , MyJwtSecret , {
        expiresIn : expiration
    })
}

export const getUsers = async (req: Request, res: Response) => {
        try {
          const users: IUser[] = await User.find();
          res.json(users);
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }

export const signIn = async (req : Request , res : Response) => {

        const { email , password}:{email : string ; password:string} = req.body

        try {
          const user = await User.login( email , password);
          const token = createToken(user._id);

          res.cookie('jwt' , token , {
            maxAge : expiration * 1000,
            httpOnly : true
        })
      
          res.status(201).json({user : user._id}); 
        } catch (error) {
          res.status(400).json({error})
        }

        
      }

export const signUp = async (req: Request, res: Response) => {
        try {
          const { name, email ,password }: { name: string ; email: string ; password: string } = req.body;
      
          // Validate request data
          if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name and email and password are required' });
          }
      
          // Check if the email already exists
          const existingUser: IUser | null = await User.findOne({ email });
          if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
          }
      
          // Create a new instance of the User model
          const newUser: IUser = new User({ name, email , password });
    
    
        // Validate the user instance
          const validationError = newUser.validateSync();
    
        if (validationError) {
        // Handle validation error (e.g., return a 400 Bad Request response)
        return res.status(400).json({ error: validationError.message });
        }
    
          // Save the user to the database
          const user = await newUser.save();
          const token = createToken(user._id);

          res.cookie('jwt' , token , {
            maxAge : expiration * 1000,
            httpOnly : true
        })
      
          res.status(201).json({user : user._id});
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }

export const logout = (req:Request , res : Response)=>{
    res.clearCookie("jwt");
    res.redirect('/signIn');
}

