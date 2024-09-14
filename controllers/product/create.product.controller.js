import { Product } from "../../models/product.model.js";
import { Category } from "../../models/category.model.js";

export const createProduct = async (req, res) => {

    const { title, description, price, stock, imageUrl, categoryId, discount } = req.body;

    try {
    
        const category = await Category.findByPk(categoryId);
        if (!category) return res.status(404).json({ message: 'Category Not Found' });

        const product = await Product.create({
            title,
            description,
            price,
            stock,
            imageUrl,
            categoryId,
            discount 
        });

        res.status(201).json({ message: 'Product Created Successfully', product });

    } catch (error) {

        res.status(500).json({ message: 'Server Error', error });

    }

};
