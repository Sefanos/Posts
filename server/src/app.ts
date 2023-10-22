import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import messageRoutes from './routes/messageRoutes';
import cookieParser from 'cookie-parser' ;
import {checkCurrent, requireAuth} from './middleware/CheckAuth';
import * as dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(express.json());
app.use(cookieParser());

//env.variables

const options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

const URI = process.env.DATABASE_URL!;
const PORT = process.env.PORT || 3000;

// Connect to MongoDB 
mongoose.connect(URI, options)

// Start the server
.then(res => 
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  }))
.catch(err => 
    console.log(err)
    )

// Routes
app.get('*' , checkCurrent);
app.use('/messages', messageRoutes)
app.use('/users', userRoutes);
app.get('/' , requireAuth ,(req , res)=>{ res.json({ok : 'good '})} )




