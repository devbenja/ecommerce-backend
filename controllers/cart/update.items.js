import { Cart } from "../../models/cart.model.js";
import { CartItem } from "../../models/cart.item.model.js";
import { Product } from "../../models/product.model.js";

export const updateCartItem = async (req, res) => {

    const { cartItemId, quantity } = req.body;
    const userId = req.userId;

    try {

        const cart = await Cart.findOne({ where: { userId } });
        if (!cart) return res.status(404).json({ message: 'Add Products to the Cart' });

        const cartItem = await CartItem.findOne({ 
            where: {
                id: cartItemId, 
                cartId: cart.id 
            } 
        });

        if (!cartItem) return res.status(404).json({ message: 'Product Not Found into the Cart' });

        const product = await Product.findOne({ where: { id: cartItem.productId } });
        if (!product) return res.status(404).json({ message: 'Product Not Found' });

        if (quantity > product.stock) {
            return res.status(400).json({ message: `Not Enough Stock. Available Stock: ${product.stock}` });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json({ message: 'Quantity Updated to Cart' });

    } catch (error) {

        res.status(500).json({ message: 'Server Error' });

    }

};
