import { Product } from "../../models/product.model.js";
import { Category } from "../../models/category.model.js";

export const readAllProducts = async (req, res) => {

    try {

        const products = await Product.findAll();

        if(products.length === 0) return res.status(404).json({ 
            message: 'Product Not Found' 
        });

        res.status(200).json(products);

    } catch (error) {

        res.status(500).json({ error: 'Server Error', error });

    }

};


export const getProductById = async (req, res) => {

    const { id } = req.params;

    try {

        const product = await Product.findByPk(id);

        if (!product) return res.status(404).json({
            message: 'Product Not Found' 
        });
        
        res.status(200).json(product);

    } catch (error) {

        res.status(500).json({ message: 'Server Error', error });

    }

};


export const getProductsByCategory = async (req, res) => {
    
    const { categoryId } = req.params;

    try {

        const category = await Category.findByPk(categoryId);
        if (!category) return res.status(404).json({ message: 'Category Not Found' });

        const products = await Product.findAll({ 
            where: { categoryId: categoryId } 
        });

        if (products.length === 0) return res.status(200).json({ 
            message: 'Products Not Found in this Category' 
        });
        

        res.status(200).json(products);

    } catch (error) {

        res.status(500).json({ message: 'Server Error', error });

    }

};
