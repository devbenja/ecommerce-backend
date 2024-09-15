import { Cart } from "../../models/cart.model.js";
import { CartItem } from "../../models/cart.item.model.js";
import { Product } from "../../models/product.model.js";

export const addToCart = async (req, res) => {
    
    const { productId, quantity } = req.body;
    const userId = req.userId; 

    try {
 
        const product = await Product.findOne({ where: { id: productId } });

        if (!product) {
            return res.status(404).json({ message: 'Product Not Found' });
        }

        if (quantity > product.stock) {
            return res.status(400).json({ message: `Not Enough Stock. Available Stock: ${product.stock}` });
        }

        let cart = await Cart.findOne({ where: { userId } });

        if (!cart) {
            cart = await Cart.create({ userId });
        }

        let cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });

        if (cartItem) {
          
            if (cartItem.quantity + quantity > product.stock) {
                return res.status(400).json({ 
                    message: `Not Enough Stock to Add ${quantity} More Units. Available Stock: ${product.stock}` 
                });
            }

            cartItem.quantity += quantity;

            await cartItem.save();

        } else {
          
            await CartItem.create({ cartId: cart.id, productId, quantity });

        }

        res.status(200).json({ message: 'Product Added to Cart Successfully' });

    } catch (error) {

        res.status(500).json({ message: 'Server error', error });

    }

};

