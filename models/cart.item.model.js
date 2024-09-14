import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Cart } from "./cart.model.js";
import { Product } from "./product.model.js";
import { User } from "./user.model.js";

export const CartItem = sequelize.define('CartItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cart,
            key: 'id',
        },
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id',
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    timestamps: true,
});


// Un usuario puede tener un solo carrito.
User.hasOne(Cart, { foreignKey: 'userId' });
// Cada carrito pertenece a un usuario.
Cart.belongsTo(User, { foreignKey: 'userId' });

// Un carrito puede tener múltiples artículos 
Cart.hasMany(CartItem, { foreignKey: 'cartId' });
// Cada artículo del carrito pertenece a un carrito específico.
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

// Un producto puede estar en múltiples artículos de carrito.
Product.hasMany(CartItem, { foreignKey: 'productId' });
// Cada artículo del carrito está asociado a un producto específico.
CartItem.belongsTo(Product, { foreignKey: 'productId' });
