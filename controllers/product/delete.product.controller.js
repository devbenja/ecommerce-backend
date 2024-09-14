import { Product } from "../../models/product.model.js";

export const deleteProduct = async (req, res) => {

    const { id } = req.params;

    try {

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Product Not Found' });
        }

        await product.destroy();

        res.status(200).json({ message: 'Product Deleted Successfully' });

    } catch (error) {

        res.status(500).json({ message: 'Server Error', error });

    }

};