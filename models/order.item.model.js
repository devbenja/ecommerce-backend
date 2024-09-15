import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Order } from "./order.model.js";
import { Product } from "./product.model.js";
import { User } from "./user.model.js";

export const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
});

// Un usuario puede tener muchos pedidos
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Un pedido tiene varios articulos (OrderItem)
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

// Un articulo de pedido esta asociado a un producto
Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });


