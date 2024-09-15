import { Cart } from "../../models/cart.model.js";
import { CartItem } from "../../models/cart.item.model.js";
import { Order } from "../../models/order.model.js";
import { OrderItem } from "../../models/order.item.model.js";
import { processPayment } from "../../utils/payment.js";
import { Product } from "../../models/product.model.js";

export const createOrder = async (req, res) => {

    const { shippingAddress, paymentMethod } = req.body;
    const userId = req.userId;
    const email_customer = req.email;
    const username_customer = req.username;

    try {

        const cart = await Cart.findOne({
            where: { userId },
            include: {
                model: CartItem,
                include: [Product],
            },
        });

        if (!cart || cart.CartItems.length === 0) {
            return res.status(400).json({ message: 'No Products in Cart' });
        }

        let total = 0;
        let description = `Order for ${username_customer}: `

        for (let item of cart.CartItems) {
            
            if (item.quantity > item.Product.stock) {
                return res.status(400).json({ message: `Insufficient Stock For Product: ${item.Product.name}` });
            }

            total += item.quantity * item.Product.price;

            description += `${item.Product.title} (x${item.quantity}), `;

        }

        description = description.slice(0, -2); 

        // Procesar el pago 
        const paymentResult = await processPayment({
            amount: total,
            email_customer, 
            username_customer,
            paymentMethod,
            description
        });

        if (!paymentResult.success) {
            return res.status(400).json({ message: 'Payment Failed', error: paymentResult.error });
        }

        const order = await Order.create({
            userId,
            total,
            shippingAddress,
            status: 'pending', 
        });

        // Mover los artículos del carrito a los artículos del pedido
        const orderItems = cart.CartItems.map(async (item) => {
            await OrderItem.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.Product.price,
            });
        });

        await Promise.all(orderItems);

        // Vaciar el carrito
        await CartItem.destroy({ where: { cartId: cart.id } });

        res.status(201).json({ message: 'Order Created Successfully, Awaiting Approval', order });

    } catch (error) {
 
        res.status(500).json({ message: 'Server Error', error });
        
    }
    
};

