import express from 'express';
import dotenv from 'dotenv';
import connect from './config/db.js';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;
connect;

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api/tasks',taskRoutes);
app.use('/api/auth',authRoutes);


//start server
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})