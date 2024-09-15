import { Cart } from "../../models/cart.model.js";
import { CartItem } from "../../models/cart.item.model.js";
import { Product } from "../../models/product.model.js";

export const getCart = async (req, res) => {

    const userId = req.userId;

    try {

        const cart = await Cart.findOne({ 
            where: { userId },
            include: {
                model: CartItem,
                include: [Product]
            }
        });

        if (!cart || cart.CartItems.length === 0) {
            return res.status(200).json({ message: 'The Cart is Empty' });
        }

        res.status(200).json(cart.CartItems);

    } catch (error) {

        res.status(500).json({ message: 'Server Error', error });

    }

};
