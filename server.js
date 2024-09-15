import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { User } from './models/user.model.js';
import { Category } from './models/category.model.js';
import { Product } from './models/product.model.js';
import { Cart } from './models/cart.model.js';
import { CartItem } from './models/cart.item.model.js';
import { Order } from './models/order.model.js';
import { OrderItem } from './models/order.item.model.js';

import { sequelize } from './config/database.js';
import { databaseConnection } from './config/database.js';
import { PORT } from './config/data_config.js';

import { authRoutes } from './routes/auth.routes.js';
import { categoryRoutes } from './routes/category.routes.js';
import { productRoutes } from './routes/product.routes.js';
import { cartRoutes } from './routes/cart.routes.js';
import { orderRoutes } from './routes/order.routes.js';


const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Rutas
app.use(authRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(orderRoutes);

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