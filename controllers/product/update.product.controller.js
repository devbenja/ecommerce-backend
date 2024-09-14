import { Product } from "../../models/product.model.js";
import { Category } from "../../models/category.model.js";

export const updateProduct = async (req, res) => {

    const { id } = req.params;
    const { title, description, price, stock, imageUrl, categoryId, discount } = req.body;

    try {

        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ message: 'Product Not Found' });

        const category = await Category.findByPk(categoryId);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        product.title = title || product.title;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock || product.stock;
        product.imageUrl = imageUrl || product.imageUrl;
        product.categoryId = categoryId || product.categoryId;
        product.discount = discount; 

        await product.save();

        res.status(200).json({ message: 'Product Updated Successfully', product });

    } catch (error) {

        res.status(500).json({ message: 'Server Error', error });

    }

};