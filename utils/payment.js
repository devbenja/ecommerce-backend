import Stripe from "stripe";
import { STRIPE_SECRET } from "../config/data_config.js";

const stripe = new Stripe(STRIPE_SECRET); 

export const processPayment = async ({ amount, email_customer, username_customer, paymentMethod, description }) => {

    try {
 
        const customer = await stripe.customers.create({
            email: email_customer,
            name: username_customer
        })

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Stripe trabaja con centavos
            currency: 'usd',
            customer: customer.id,
            payment_method: paymentMethod,
            confirm: true,
            automatic_payment_methods: {
                enabled: true, 
                allow_redirects: 'never'
            }, 
            description
        });

        return { success: true, paymentIntent };

    } catch (error) {
        
        return { success: false, error: error.message };

    }

};