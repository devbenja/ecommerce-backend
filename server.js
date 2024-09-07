import express from 'express';
import cors from 'cors';

import { User } from './models/user.model.js';
import { sequelize } from './config/database.js';
import { databaseConnection } from './config/database.js';
import { PORT } from './config/data_config.js';
import { authRouter } from './routes/auth.routes.js';

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.use(authRouter);

// Puerto
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));

databaseConnection();

// Error Handler
app.use((err, req, res, next ) => {
    res.status(500).json({
        status: 'error',
        message: err.message
    });
});

// Creación de Tablas según los modelos que establecimos
sequelize.sync({ force: false }) 
.then(() => {
    console.log('Database & Tables Created!');
})
.catch((err) => console.log(err));