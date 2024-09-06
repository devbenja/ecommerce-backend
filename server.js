import express from 'express';
import { databaseConnection } from './config/database.js';
import { PORT } from './config/data_config.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));

databaseConnection();