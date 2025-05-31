import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';
import csRoutes from './routes/csRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

connectDB();

app.use('/api/v1',csRoutes);
app.use('/api/v1',userRoutes);

app.listen(PORT,()=>{
    console.log(`Server boom boom on ${PORT}`);
});