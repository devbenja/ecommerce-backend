import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Category } from "./category.model.js";

export const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    discount: {
        type: DataTypes.DECIMAL(5, 2), // Descuento como porcentaje (por ejemplo, 10.00%)
        allowNull: true,
        defaultValue: null, 
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id',
        },
    },
}, {
    timestamps: true,
    // Si hay un descuento actualizamos el precio
    hooks: {
        beforeSave: (product) => {
            if (product.discount) {
                const discountAmount = (product.price * product.discount) / 100;
                product.price = product.price - discountAmount;
            }
        }
    }
});


Product.belongsTo(Category, { foreignKey: 'categoryId' });