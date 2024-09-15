import { Cart } from "../../models/cart.model.js";
import { CartItem } from "../../models/cart.item.model.js";

export const removeFromCart = async (req, res) => {

    const { cartItemId } = req.params;
    const userId = req.userId;

    try {

        const cart = await Cart.findOne({ where: { userId } });
        if (!cart) return res.status(404).json({ message: 'Cart Not Found' });

        const cartItem = await CartItem.findOne({ where: { id: cartItemId, cartId: cart.id } });
        if (!cartItem) return res.status(404).json({ message: 'Product Not Found in Cart' });

        await cartItem.destroy();

        res.status(200).json({ message: 'Producto Deleted to Cart' });

    } catch (error) {

        res.status(500).json({ message: 'Server Error', error });

    }

};
